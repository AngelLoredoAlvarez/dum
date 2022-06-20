import { VStack } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import ProductsInTheShoppingList from "../../components/ProductsInTheShoppingList";
import Redirect from "../../components/Redirect";
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

  if (
    shoppingListPageQuery.currentUser === null ||
    shoppingListPageQuery.currentUser === undefined
  )
    return <Redirect href="/" />;

  return (
    <Layout currentUser={shoppingListPageQuery}>
      <VStack alignItems={"center"} flex={1} space={3}>
        <ProductsInTheShoppingList
          currentUserID={shoppingListPageQuery.currentUser.id}
          freeShippingPercentage={
            shoppingListPageQuery.currentUserOpenedShoppingList
          }
          mainDepartments={shoppingListPageQuery}
          productsInTheShoppingList={
            shoppingListPageQuery.currentUserOpenedShoppingList
          }
        />
      </VStack>
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
