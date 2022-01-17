import { asRoot } from "../../../__tests__/helpers";
import {
  deleteTestUsers,
  runGraphQLQuery,
  sanitize,
  setup,
  teardown,
} from "../helpers";

beforeEach(deleteTestUsers);
beforeAll(setup);
afterAll(teardown);

test("Register", async () => {
  await runGraphQLQuery(
    // GraphQL query goes here:
    `mutation Register(
      $name: String!,
      $firstSurname: String!,
      $secondSurname: String,
      $username: String!,
      $avatarUrl: String,
      $email: String!,
      $password: String!
    ) {
      register(
        input: {
          name: $name
          firstSurname: $firstSurname
          secondSurname: $secondSurname
          username: $username
          avatarUrl: $avatarUrl
          email: $email
          password: $password
        }
      ) {
        user {
          id
          name
          avatarUrl
          createdAt
          isAdmin
          isVerified
          updatedAt
          username
        }
      }
    }
    `,

    // GraphQL variables:
    {
      name: "Test Name",
      firstSurname: "testFirstSurname",
      secondSurname: "testSecondSurname",
      username: "testuser",
      email: "test.user@example.org",
      password: "SECURE_PASSWORD",
    },

    // Additional props to add to `req` (e.g. `user: {session_id: '...'}`)
    {
      login: jest.fn((_user, cb) => process.nextTick(cb)),
    },

    // This function runs all your test assertions:
    async (json, { pgClient }) => {
      expect(json.errors).toBeFalsy();
      expect(json.data).toBeTruthy();
      expect(json.data!.register).toBeTruthy();
      expect(json.data!.register.user).toBeTruthy();
      expect(sanitize(json.data!.register.user)).toMatchInlineSnapshot(`
Object {
  "avatarUrl": null,
  "createdAt": "[timestamp-1]",
  "id": "[id-1]",
  "isAdmin": false,
  "isVerified": false,
  "name": "Test Name",
  "updatedAt": "[timestamp-1]",
  "username": "[username-1]",
}
`);
      const id = json.data!.register.user.id;

      // If you need to, you can query the DB within the context of this
      // function - e.g. to check that your mutation made the changes you'd
      // expect.
      const { rows } = await asRoot(pgClient, () =>
        pgClient.query(`SELECT * FROM dum_public.users WHERE id = $1`, [id])
      );
      if (rows.length !== 1) {
        throw new Error("User not found!");
      }
      expect(rows[0].username).toEqual(json.data!.register.user.username);
    }
  );
});
