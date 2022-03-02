import { ScrollView, Text, VStack } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import MainDepartmentsList from "../../components/MainDepartmentsList";
import type { ShoppingListPageQuery as ShoppingListQueryTypes } from "../../graphql/Queries/__generated__/ShoppingListPageQuery.graphql";
import ShoppingListPageQuery from "../../graphql/Queries/ShoppingListPageQuery";
import { getClientEnvironment } from "../../lib/client";

function ShoppingListPage({
  preloadedQuery,
}: RelayProps<{}, ShoppingListQueryTypes>) {
  const shoppingListPageQuery = usePreloadedQuery<ShoppingListQueryTypes>(
    ShoppingListPageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={shoppingListPageQuery}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <VStack alignItems={"center"} flex={1} space={3}>
          <MainDepartmentsList departments={shoppingListPageQuery} />
          <Text
            fontSize={{
              base: "lg",
              sm: "lg",
              md: "xl",
              lg: "2xl",
              xl: "3xl",
              "2xl": "4xl",
            }}
          >
            Los Productos en tu Carrito
          </Text>
        </VStack>
      </ScrollView>
    </Layout>
  );
}

export default withRelay(ShoppingListPage, ShoppingListPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import("../../lib/server/server");

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
