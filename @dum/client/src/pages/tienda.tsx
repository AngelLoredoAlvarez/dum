import { Text } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import type { StorePageQuery as StorePageQueryTypes } from "../graphql/__generated__/StorePageQuery.graphql";
import StorePageQuery from "../graphql/StorePageQuery";
import { getClientEnvironment } from "../lib/client";

function StorePage({ preloadedQuery }: RelayProps<{}, StorePageQueryTypes>) {
  const storePageQuery = usePreloadedQuery<StorePageQueryTypes>(
    StorePageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={storePageQuery.currentUser}>
      <Text>Store</Text>
    </Layout>
  );
}

export default withRelay(StorePage, StorePageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import("../lib/server/server");

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
