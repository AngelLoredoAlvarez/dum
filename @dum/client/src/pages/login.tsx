import { Text } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../components/Layout";
import type { LoginPageQuery as LoginPageQueryTypes } from "../graphql/__generated__/LoginPageQuery.graphql";
import LoginPageQuery from "../graphql/LoginPageQuery";
import { getClientEnvironment } from "../lib/client";

function LoginPage({ preloadedQuery }: RelayProps<{}, LoginPageQueryTypes>) {
  const loginPageQuery = usePreloadedQuery<LoginPageQueryTypes>(
    LoginPageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={loginPageQuery.currentUser}>
      <Text>Login</Text>
    </Layout>
  );
}

export default withRelay(LoginPage, LoginPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import("../lib/server/server");

    return createServerEnvironment(cookies);
  },
  fallback: () => <Text>Cargando tus pinches datos prro</Text>,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
