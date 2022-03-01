import { ScrollView } from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { useMutation, usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import MainDepartmentsList from "../../components/MainDepartmentsList";
import type { CreateShoppingListMutation as CreateShoppingListMutationTypes } from "../../graphql/Mutations/__generated__/CreateShoppingListMutation.graphql";
import CreateShoppingListMutation from "../../graphql/Mutations/CreateShoppingListMutation";
import type { AddedProductPageQuery as AddedProductPageQueryTypes } from "../../graphql/Queries/__generated__/AddedProductPageQuery.graphql";
import AddedProductPageQuery from "../../graphql/Queries/AddedProductPageQuery";
import { getClientEnvironment } from "../../lib/client";

function AddedProductPage({
  preloadedQuery,
}: RelayProps<{}, AddedProductPageQueryTypes>) {
  const [createShoppingList] = useMutation<CreateShoppingListMutationTypes>(
    CreateShoppingListMutation
  );

  const router = useRouter();
  React.useEffect(() => {
    const { product_id, quantity } = router.query;
    if (product_id !== undefined && quantity !== undefined) {
      console.log("No Vacias: " + product_id + " " + quantity);
    } else {
      console.log("Vacias");
    }
  }, [router.query]);

  const addedProductPageQuery = usePreloadedQuery<AddedProductPageQueryTypes>(
    AddedProductPageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={addedProductPageQuery}>
      <ScrollView>
        <MainDepartmentsList departments={addedProductPageQuery} />
      </ScrollView>
    </Layout>
  );
}

export default withRelay(AddedProductPage, AddedProductPageQuery, {
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
