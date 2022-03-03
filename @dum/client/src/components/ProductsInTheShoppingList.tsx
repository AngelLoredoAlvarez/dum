import { FlatList } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import type { MainDepartmentsFragment_mainDepartments$key } from "../graphql/Fragments/__generated__/MainDepartmentsFragment_mainDepartments.graphql";
import type { ProductsInTheShoppingListFragment_productsInTheShoppingList$key } from "../graphql/Fragments/__generated__/ProductsInTheShoppingListFragment_productsInTheShoppingList.graphql";
import ProductsInTheShoppingListFragment from "../graphql/Fragments/ProductsInTheShoppingListFragment";
import Loading from "./Loading";
import ProductInShoppingListItem from "./ProductInShoppingListItem";
import ProductsInTheShoppingListHeader from "./ProductsInTheShoppingListHeader";

interface ProductsInTheShoppingListProps {
  amountOfItemsToFetch: number;
  mainDepartments: MainDepartmentsFragment_mainDepartments$key;
  productsInTheShoppingList: ProductsInTheShoppingListFragment_productsInTheShoppingList$key;
}

function ProductsInTheShoppingList(props: ProductsInTheShoppingListProps) {
  const { data, isLoadingNext, hasNext, loadNext } = usePaginationFragment(
    ProductsInTheShoppingListFragment,
    props.productsInTheShoppingList
  );

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: "center",
        flex: 1,
        flexGrow: 1,
      }}
      data={data.productsInTheShoppingList.edges}
      flex={1}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponentStyle={{
        alignItems: "stretch",
        width: "100%",
      }}
      ListFooterComponent={hasNext ? isLoadingNext ? <Loading /> : null : null}
      ListHeaderComponent={
        <ProductsInTheShoppingListHeader
          mainDepartments={props.mainDepartments}
        />
      }
      onEndReached={() => {
        loadNext(props.amountOfItemsToFetch);
      }}
      onEndReachedThreshold={0}
      renderItem={({ item }) => (
        <ProductInShoppingListItem productInShoppingList={item.node} />
      )}
      w={"100%"}
    />
  );
}

export default ProductsInTheShoppingList;