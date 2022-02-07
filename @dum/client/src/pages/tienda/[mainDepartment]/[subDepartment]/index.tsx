import { Text, VStack } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../../../components/Layout";
import Loading from "../../../../components/Loading";
import MainDepartmentsList from "../../../../components/MainDepartmentsList";
import SubDepartmentProductsList from "../../../../components/SubDepartmentProductsList";
import type { SubDepartmentPageQuery as SubDepartmentPageQueryTypes } from "../../../../graphql/Queries/__generated__/SubDepartmentPageQuery.graphql";
import SubDepartmentPageQuery from "../../../../graphql/Queries/SubDepartmentPageQuery";
import { getClientEnvironment } from "../../../../lib/client";

function SubDepartmentPage({
  preloadedQuery,
}: RelayProps<{}, SubDepartmentPageQueryTypes>) {
  const subDepartmentPageQuery = usePreloadedQuery<SubDepartmentPageQueryTypes>(
    SubDepartmentPageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={subDepartmentPageQuery.currentUser}>
      <VStack alignItems={"center"} flex={1} space={3} w={"100%"}>
        <MainDepartmentsList departments={subDepartmentPageQuery} />
        <Text
          bold
          fontSize={{
            base: "sm",
            sm: "sm",
            md: "md",
            lg: "lg",
            xl: "xl",
            "2xl": "5xl",
          }}
          textAlign={"center"}
        >
          {subDepartmentPageQuery.subDepartmentByName.subDepartment}
        </Text>
        <Text
          bold
          fontSize={{
            base: "sm",
            sm: "sm",
            md: "md",
            lg: "lg",
            xl: "xl",
            "2xl": "2xl",
          }}
          textAlign={"center"}
        >
          {subDepartmentPageQuery.subDepartmentByName.description}
        </Text>
        <SubDepartmentProductsList
          products={subDepartmentPageQuery.subDepartmentByName}
        />
      </VStack>
    </Layout>
  );
}

export default withRelay(SubDepartmentPage, SubDepartmentPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import(
      "../../../../lib/server/server"
    );

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});