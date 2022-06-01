import { Hidden } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import ProductsLikeTheLastAddedProductList from "../../components/ProductsLikeTheLastAddedProductList";
import Redirect from "../../components/Redirect";
import type { LastAddedProductPageQuery as LastAddedProductPageQueryTypes } from "../../graphql/Queries/__generated__/LastAddedProductPageQuery.graphql";
import LastAddedProductPageQuery from "../../graphql/Queries/LastAddedProductPageQuery";
import { getClientEnvironment } from "../../lib/client";

function LastAddedProductPage({
  preloadedQuery,
}: RelayProps<{}, LastAddedProductPageQueryTypes>) {
  const lastAddedProductPageQuery =
    usePreloadedQuery<LastAddedProductPageQueryTypes>(
      LastAddedProductPageQuery,
      preloadedQuery
    );

  if (
    lastAddedProductPageQuery.currentUser === null ||
    lastAddedProductPageQuery.currentUser === undefined
  )
    return <Redirect href="/" />;

  return (
    <Layout currentUser={lastAddedProductPageQuery}>
      <Hidden only={["base", "sm", "md", "lg"]}>
        <ProductsLikeTheLastAddedProductList
          amountOfItemsToFetch={5}
          lastAddedProductInTheShoppingList={
            lastAddedProductPageQuery.lastAddedProductInTheShoppingList
          }
          mainDepartments={lastAddedProductPageQuery}
          numberOfColumns={5}
          productsLikeTheLastAddedProductList={lastAddedProductPageQuery}
        />
      </Hidden>
      <Hidden only={["base", "sm", "md", "xl", "2xl"]}>
        <ProductsLikeTheLastAddedProductList
          amountOfItemsToFetch={4}
          lastAddedProductInTheShoppingList={
            lastAddedProductPageQuery.lastAddedProductInTheShoppingList
          }
          mainDepartments={lastAddedProductPageQuery}
          numberOfColumns={4}
          productsLikeTheLastAddedProductList={lastAddedProductPageQuery}
        />
      </Hidden>
      <Hidden only={["base", "sm", "lg", "xl", "2xl"]}>
        <ProductsLikeTheLastAddedProductList
          amountOfItemsToFetch={3}
          lastAddedProductInTheShoppingList={
            lastAddedProductPageQuery.lastAddedProductInTheShoppingList
          }
          mainDepartments={lastAddedProductPageQuery}
          numberOfColumns={3}
          productsLikeTheLastAddedProductList={lastAddedProductPageQuery}
        />
      </Hidden>
      <Hidden only={["base", "md", "lg", "xl", "2xl"]}>
        <ProductsLikeTheLastAddedProductList
          amountOfItemsToFetch={2}
          lastAddedProductInTheShoppingList={
            lastAddedProductPageQuery.lastAddedProductInTheShoppingList
          }
          mainDepartments={lastAddedProductPageQuery}
          numberOfColumns={2}
          productsLikeTheLastAddedProductList={lastAddedProductPageQuery}
        />
      </Hidden>
      <Hidden only={["sm", "md", "lg", "xl", "2xl"]}>
        <ProductsLikeTheLastAddedProductList
          amountOfItemsToFetch={1}
          lastAddedProductInTheShoppingList={
            lastAddedProductPageQuery.lastAddedProductInTheShoppingList
          }
          mainDepartments={lastAddedProductPageQuery}
          numberOfColumns={1}
          productsLikeTheLastAddedProductList={lastAddedProductPageQuery}
        />
      </Hidden>
    </Layout>
  );
}

export default withRelay(LastAddedProductPage, LastAddedProductPageQuery, {
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
