import { FlatList, Text } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import type { MainDepartmentsFragment_mainDepartments$key } from "../graphql/Fragments/__generated__/MainDepartmentsFragment_mainDepartments.graphql";
import type { ProductsInTheShoppingListFooterFragment_costs$key } from "../graphql/Fragments/__generated__/ProductsInTheShoppingListFooterFragment_costs.graphql";
import type { ProductsInTheShoppingListFragment_productsInTheShoppingList$key } from "../graphql/Fragments/__generated__/ProductsInTheShoppingListFragment_productsInTheShoppingList.graphql";
import ProductsInTheShoppingListFragment from "../graphql/Fragments/ProductsInTheShoppingListFragment";
import Loading from "./Loading";
import ProductInShoppingListItem from "./ProductInShoppingListItem";
import ProductsInTheShoppingListFooter from "./ProductsInTheShoppingListFooter";
import ProductsInTheShoppingListHeader from "./ProductsInTheShoppingListHeader";

interface ProductsInTheShoppingListProps {
  costs: ProductsInTheShoppingListFooterFragment_costs$key;
  currentUserID: string;
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
      data={data.productsInTheShoppingList.edges}
      flex={1}
      keyExtractor={(item) => item.node.id}
      ListEmptyComponent={
        <Text
          fontSize={{
            base: "md",
            sm: "md",
            md: "lg",
            lg: "xl",
            xl: "2xl",
            "2xl": "3xl",
          }}
          textAlign={"center"}
        >
          Tu Carrito esta vacio :'(
        </Text>
      }
      ListHeaderComponentStyle={{
        alignItems: "stretch",
        width: "100%",
      }}
      ListFooterComponent={
        hasNext ? (
          isLoadingNext ? (
            <Loading />
          ) : null
        ) : (
          <ProductsInTheShoppingListFooter costs={props.costs} />
        )
      }
      ListHeaderComponent={
        <ProductsInTheShoppingListHeader
          mainDepartments={props.mainDepartments}
        />
      }
      onEndReached={() => {
        loadNext(3);
      }}
      onEndReachedThreshold={0}
      renderItem={({ item }) => (
        <ProductInShoppingListItem
          currentUserID={props.currentUserID}
          productInShoppingList={item.node}
          productsInTheShoppingListID={data.productsInTheShoppingList.__id}
        />
      )}
      w={"100%"}
    />
  );
}

export default ProductsInTheShoppingList;
