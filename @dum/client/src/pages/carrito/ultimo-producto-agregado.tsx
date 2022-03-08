import { ScrollView, VStack } from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { useMutation, usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import LastAddedProductInTheShoppingList from "../../components/LastAddedProductInTheShoppingList";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import MainDepartmentsList from "../../components/MainDepartmentsList";
import Redirect from "../../components/Redirect";
import type { AddToShoppingListMutation as AddToShoppingListMutationTypes } from "../../graphql/Mutations/__generated__/AddToShoppingListMutation.graphql";
import AddToShoppingListMutation from "../../graphql/Mutations/AddToShoppingListMutation";
import type { LastAddedProductPageQuery as LastAddedProductPageQueryTypes } from "../../graphql/Queries/__generated__/LastAddedProductPageQuery.graphql";
import LastAddedProductPageQuery from "../../graphql/Queries/LastAddedProductPageQuery";
import { getClientEnvironment } from "../../lib/client";

function LastAddedProductPage({
  preloadedQuery,
}: RelayProps<{}, LastAddedProductPageQueryTypes>) {
  const [addToShoppingList] = useMutation<AddToShoppingListMutationTypes>(
    AddToShoppingListMutation
  );

  const router = useRouter();

  React.useEffect(() => {
    const { product_id, quantity } = router.query;
    if (product_id !== undefined && quantity !== undefined) {
      addToShoppingList({
        onCompleted: () => {},
        onError: () => {},
        variables: {
          AddToShoppingListInput: {
            productId: `${product_id}`,
            quantity: Number.parseInt(`${quantity}`),
          },
        },
      });
    }
  }, [addToShoppingList, router.query]);

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
      <VStack alignItems={"center"} flex={1} space={3}>
        <MainDepartmentsList departments={lastAddedProductPageQuery} />
        <LastAddedProductInTheShoppingList
          lastAddedProductInTheShoppingList={
            lastAddedProductPageQuery.lastAddedProductInTheShoppingList
          }
        />
      </VStack>
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
