import { VStack } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../../../../components/Layout";
import Loading from "../../../../../components/Loading";
import MainDepartmentsList from "../../../../../components/MainDepartmentsList";
import type { ProductPageQuery as ProductPageQueryTypes } from "../../../../../graphql/Queries/__generated__/ProductPageQuery.graphql";
import ProductPageQuery from "../../../../../graphql/Queries/ProductPageQuery";
import { getClientEnvironment } from "../../../../../lib/client";

function ProductPage({
  preloadedQuery,
}: RelayProps<{}, ProductPageQueryTypes>) {
  const productPageQuery = usePreloadedQuery<ProductPageQueryTypes>(
    ProductPageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={productPageQuery.currentUser}>
      <VStack borderWidth={1} h={"100%"} w={"100%"}>
        <MainDepartmentsList departments={productPageQuery} />
      </VStack>
    </Layout>
  );
}

export default withRelay(ProductPage, ProductPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import(
      "../../../../../lib/server/server"
    );

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
