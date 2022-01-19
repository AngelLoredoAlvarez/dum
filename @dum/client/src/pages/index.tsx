import { Heading, Text } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../components/Layout";
import type { IndexPageQuery as IndexPageQueryTypes } from "../graphql/__generated__/IndexPageQuery.graphql";
import IndexPageQuery from "../graphql/IndexPageQuery";
import { getClientEnvironment } from "../lib/client";

function IndexPage({ preloadedQuery }: RelayProps<{}, IndexPageQueryTypes>) {
  const indexPageQuery = usePreloadedQuery<IndexPageQueryTypes>(
    IndexPageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={indexPageQuery.currentUser}>
      <Heading>¡Las Noticias!</Heading>
      {indexPageQuery.posts.edges.map(({ node }) => (
        <Text key={node.id}>{node.id}</Text>
      ))}
    </Layout>
  );
}

export default withRelay(IndexPage, IndexPageQuery, {
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
