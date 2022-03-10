import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import type { RegisterPageQuery as RegisterPageQueryTypes } from "../graphql/Queries/__generated__/RegisterPageQuery.graphql";
import RegisterPageQuery from "../graphql/Queries/RegisterPageQuery";
import { getClientEnvironment } from "../lib/client";

function RegisterPage({
  preloadedQuery,
}: RelayProps<{}, RegisterPageQueryTypes>) {
  const registerPageQuery = usePreloadedQuery<RegisterPageQueryTypes>(
    RegisterPageQuery,
    preloadedQuery
  );

  return <Layout currentUser={registerPageQuery}></Layout>;
}

export default withRelay(RegisterPage, RegisterPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import("../lib/server/server");

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies: string = ctx.req.headers.cookie;

    return { cookies };
  },
});
