import { FlatList, Heading } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import PostListItem from "../components/PostListItem";
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
      <Heading size={["xl", "2xl", "3xl"]}>¡Las Noticias!</Heading>
      <FlatList
        data={indexPageQuery.posts.edges}
        keyExtractor={(item) => item.node.__id}
        renderItem={({ item }) => <PostListItem post={item.node} />}
      />
    </Layout>
  );
}

export default withRelay(IndexPage, IndexPageQuery, {
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
