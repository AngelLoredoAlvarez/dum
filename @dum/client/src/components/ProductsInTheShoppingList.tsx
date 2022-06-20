import { FlatList } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import type { ProductsInTheShoppingListFragment_shoppingListDetails$key } from "../graphql/Fragments/__generated__/ProductsInTheShoppingListFragment_shoppingListDetails.graphql";
import ProductsInTheShoppingListFragment from "../graphql/Fragments/ProductsInTheShoppingListFragment";
import Loading from "./Loading";
import ProductInShoppingListItem from "./ProductInShoppingListItem";

interface ProductsInTheShoppingListProps {
  currentUserID: string;
  productsInTheShoppingList: ProductsInTheShoppingListFragment_shoppingListDetails$key;
}

function ProductsInTheShoppingList(props: ProductsInTheShoppingListProps) {
  const { data, isLoadingNext, hasNext, loadNext } = usePaginationFragment(
    ProductsInTheShoppingListFragment,
    props.productsInTheShoppingList
  );

  return (
    <FlatList
      data={data.shoppingListDetails.edges}
      flex={1}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponentStyle={{
        alignItems: "stretch",
        width: "100%",
      }}
      ListFooterComponent={hasNext ? isLoadingNext ? <Loading /> : null : null}
      onEndReached={() => {
        loadNext(3);
      }}
      onEndReachedThreshold={0}
      renderItem={({ item }) => (
        <ProductInShoppingListItem
          currentUserID={props.currentUserID}
          productInShoppingList={item.node}
          productsInTheShoppingListID={data.shoppingListDetails.__id}
        />
      )}
      w={"100%"}
    />
  );
}

export default ProductsInTheShoppingList;
