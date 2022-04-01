import { gql, makeExtendSchemaPlugin } from "graphile-utils";

import { OurGraphQLContext } from "../middleware/installPostGraphile";
import { ERROR_MESSAGE_OVERRIDES } from "../utils/handleErrors";

const PassportLoginPlugin = makeExtendSchemaPlugin((build) => ({
  typeDefs: gql`
    input RegisterInput {
      name: String!
      firstSurname: String!
      secondSurname: String
      avatarUrl: String
      email: String!
      password: String!
    }

    type RegisterPayload {
      user: User! @pgField
    }

    input LoginInput {
      email: String!
      password: String!
    }

    type LoginPayload {
      user: User! @pgField
    }

    type LogoutPayload {
      success: Boolean
    }

    """
    All input for the \`resetPassword\` mutation.
    """
    input ResetPasswordInput {
      """
      An arbitrary string value with no semantic meaning. Will be included in the
      payload verbatim. May be used to track mutations by the client.
      """
      clientMutationId: String

      userId: UUID!
      resetToken: String!
      newPassword: String!
    }

    """
    The output of our \`resetPassword\` mutation.
    """
    type ResetPasswordPayload {
      """
      The exact same \`clientMutationId\` that was provided in the mutation input,
      unchanged and unused. May be used by a client to track mutations.
      """
      clientMutationId: String

      """
      Our root query field type. Allows us to run any query from our mutation payload.
      """
      query: Query

      success: Boolean
    }

    extend type Mutation {
      """
      Use this mutation to create an account on our system. This may only be used if you are logged out.
      """
      register(input: RegisterInput!): RegisterPayload

      """
      Use this mutation to log in to your account; this login uses sessions so you do not need to take further action.
      """
      login(input: LoginInput!): LoginPayload

      """
      Use this mutation to logout from your account. Don't forget to clear the client state!
      """
      logout: LogoutPayload

      """
      After triggering forgotPassword, you'll be sent a reset token. Combine this with your user ID and a new password to reset your password.
      """
      resetPassword(input: ResetPasswordInput!): ResetPasswordPayload
    }
  `,
  resolvers: {
    Mutation: {
      async register(_mutation, args, context: OurGraphQLContext, resolveInfo) {
        const { selectGraphQLResultFromTable } = resolveInfo.graphile;
        const {
          name,
          firstSurname,
          secondSurname,
          avatarUrl,
          email,
          password,
        } = args.input;
        const { rootPgPool, login, pgClient } = context;
        try {
          // Call our login function to find out if the email/password combination exists
          const {
            rows: [details],
          } = await rootPgPool.query(
            `
            with new_user as (
              select users.* from dum_private.really_create_user(
                name => $1,
                first_surname => $2,
                second_surname => $3,
                avatar_url => $4,
                email => $5,
                password => $6,
                email_is_verified => false
              ) users where not (users is null)
            ), new_session as (
              insert into dum_private.sessions (user_id)
              select id from new_user
              returning *
            )
            select new_user.id as user_id, new_session.uuid as session_id
            from new_user, new_session`,
            [name, firstSurname, secondSurname, avatarUrl, email, password]
          );

          if (!details || !details.user_id) {
            const e = new Error("Registration failed");
            e["code"] = "FFFFF";
            throw e;
          }

          if (details.session_id) {
            // Store into transaction
            await pgClient.query(
              `select set_config('jwt.claims.session_id', $1, true)`,
              [details.session_id]
            );

            // Tell Passport.js we're logged in
            await login({ session_id: details.session_id });
          }

          // Fetch the data that was requested from GraphQL, and return it
          const sql = build.pgSql;
          const [row] = await selectGraphQLResultFromTable(
            sql.fragment`dum_public.users`,
            (tableAlias, sqlBuilder) => {
              sqlBuilder.where(
                sql.fragment`${tableAlias}.id = ${sql.value(details.user_id)}`
              );
            }
          );
          return {
            data: row,
          };
        } catch (e: any) {
          const { code } = e;
          const safeErrorCodes = [
            "WEAKP",
            "LOCKD",
            "EMTKN",
            ...Object.keys(ERROR_MESSAGE_OVERRIDES),
          ];
          if (safeErrorCodes.includes(code)) {
            throw e;
          } else {
            console.error(
              "Unrecognised error in PassportLoginPlugin; replacing with sanitized version"
            );
            console.error(e);
            const error = new Error("Registration failed");
            error["code"] = code;
            throw error;
          }
        }
      },
      async login(_mutation, args, context: OurGraphQLContext, resolveInfo) {
        const { selectGraphQLResultFromTable } = resolveInfo.graphile;
        const { email, password } = args.input;
        const { rootPgPool, login, pgClient } = context;
        try {
          // Call our login function to find out if the email/password combination exists
          const {
            rows: [session],
          } = await rootPgPool.query(
            `select sessions.* from dum_private.login($1, $2) sessions where not (sessions is null)`,
            [email, password]
          );

          if (!session) {
            const error = new Error(
              "Correo Electrónico y/o Contraseña Incorrectos"
            );
            error["code"] = "CREDS";
            throw error;
          }

          if (session.uuid) {
            // Tell Passport.js we're logged in
            await login({ session_id: session.uuid });
          }

          // Get session_id from PG
          await pgClient.query(
            `select set_config('jwt.claims.session_id', $1, true)`,
            [session.uuid]
          );

          // Fetch the data that was requested from GraphQL, and return it
          const sql = build.pgSql;
          const [row] = await selectGraphQLResultFromTable(
            sql.fragment`dum_public.users`,
            (tableAlias, sqlBuilder) => {
              sqlBuilder.where(
                sql.fragment`${tableAlias}.id = dum_public.current_user_id()`
              );
            }
          );
          return {
            data: row,
          };
        } catch (e: any) {
          const { code }: any = e;
          const safeErrorCodes = ["LOCKD", "CREDS"];
          if (safeErrorCodes.includes(code)) {
            throw e;
          } else {
            console.error(e);
            const error = new Error("Login failed");
            error["code"] = e.code;
            throw error;
          }
        }
      },

      async logout(_mutation, _args, context: OurGraphQLContext, _resolveInfo) {
        const { pgClient, logout } = context;
        await pgClient.query("select dum_public.logout();");
        await logout();
        return {
          success: true,
        };
      },

      async resetPassword(
        _mutation,
        args,
        context: OurGraphQLContext,
        _resolveInfo
      ) {
        const { rootPgPool } = context;
        const { userId, resetToken, newPassword, clientMutationId } =
          args.input;

        // Since the `reset_password` function needs to keep track of attempts
        // for security, we cannot risk the transaction being rolled back by a
        // later error. As such, we don't allow users to call this function
        // through normal means, instead calling it through our root pool
        // without a transaction.
        const {
          rows: [row],
        } = await rootPgPool.query(
          `select dum_private.reset_password($1::uuid, $2::text, $3::text) as success`,
          [userId, resetToken, newPassword]
        );

        return {
          clientMutationId,
          success: row?.success,
        };
      },
    },
  },
}));

export default PassportLoginPlugin;
