import { Text, VStack } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import MainDepartmentsList from "../../../components/MainDepartmentsList";
import type { MainDepartmentPageQuery as MainDepartmentPageQueryTypes } from "../../../graphql/Queries/__generated__/MainDepartmentPageQuery.graphql";
import MainDepartmentPageQuery from "../../../graphql/Queries/MainDepartmentPageQuery";
import { getClientEnvironment } from "../../../lib/client";

function MainDepartmentPage({
  preloadedQuery,
}: RelayProps<{}, MainDepartmentPageQueryTypes>) {
  const mainDepartmentPageQuery =
    usePreloadedQuery<MainDepartmentPageQueryTypes>(
      MainDepartmentPageQuery,
      preloadedQuery
    );

  return (
    <Layout currentUser={mainDepartmentPageQuery.currentUser}>
      <VStack alignItems={"center"} flex={1} space={3} w={"100%"}>
        <MainDepartmentsList departments={mainDepartmentPageQuery} />
        <Text>Main Department</Text>
      </VStack>
    </Layout>
  );
}

export default withRelay(MainDepartmentPage, MainDepartmentPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import(
      "../../../lib/server/server"
    );

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
