import { FlatList, Text } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import type { FreeShippingPercentageFragment_freeShippingPercentage$key } from "../graphql/Fragments/__generated__/FreeShippingPercentageFragment_freeShippingPercentage.graphql";
import type { LastAddedProductInTheShoppingListFragment_lastAddedProduct$key } from "../graphql/Fragments/__generated__/LastAddedProductInTheShoppingListFragment_lastAddedProduct.graphql";
import type { MainDepartmentsFragment_mainDepartments$key } from "../graphql/Fragments/__generated__/MainDepartmentsFragment_mainDepartments.graphql";
import type { ProductsLikeTheLastAddedProductListFragment_productsLikeTheLastAddedProductList$key } from "../graphql/Fragments/__generated__/ProductsLikeTheLastAddedProductListFragment_productsLikeTheLastAddedProductList.graphql";
import ProductsLikeTheLastAddedProductListFragment from "../graphql/Fragments/ProductsLikeTheLastAddedProductListFragment";
import Loading from "./Loading";
import ProductLikeTheLastAddedProductItem from "./ProductLikeTheLastAddedProductListItem";
import ProductsLikeTheLastAddedProductListHeader from "./ProductsLikeTheLastAddedProductListHeader";

interface ProductsLikeTheLastAddedProductListProps {
  amountOfItemsToFetch: number;
  freeShippingPercentage: FreeShippingPercentageFragment_freeShippingPercentage$key;
  lastAddedProductInTheShoppingList: LastAddedProductInTheShoppingListFragment_lastAddedProduct$key;
  mainDepartments: MainDepartmentsFragment_mainDepartments$key;
  numberOfColumns: number;
  productsLikeTheLastAddedProductList: ProductsLikeTheLastAddedProductListFragment_productsLikeTheLastAddedProductList$key;
}

function ProductsLikeTheLastAddedProductList(
  props: ProductsLikeTheLastAddedProductListProps
) {
  const { data, isLoadingNext, hasNext, loadNext } = usePaginationFragment(
    ProductsLikeTheLastAddedProductListFragment,
    props.productsLikeTheLastAddedProductList
  );

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: "center",
        flex: 1,
        flexGrow: 1,
      }}
      data={data.productsLikeTheLastAddedProduct.edges}
      flex={1}
      keyExtractor={(item) => item.node.id}
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
          <Text
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
            No hay nada más para mostrar
          </Text>
        )
      }
      ListHeaderComponent={
        <ProductsLikeTheLastAddedProductListHeader
          freeShippingPercentage={props.freeShippingPercentage}
          lastAddedProductInTheShoppingList={
            props.lastAddedProductInTheShoppingList
          }
          mainDepartments={props.mainDepartments}
        />
      }
      numColumns={props.numberOfColumns}
      onEndReached={() => {
        loadNext(props.amountOfItemsToFetch);
      }}
      onEndReachedThreshold={0}
      renderItem={({ item }) => (
        <ProductLikeTheLastAddedProductItem
          productLikeTheLastAddedProduct={item.node}
        />
      )}
      w={"100%"}
    />
  );
}

export default ProductsLikeTheLastAddedProductList;
