import { FlatList } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import type { BestSellersFragment_bestSellers$key } from "../graphql/Fragments/__generated__/BestSellersFragment_bestSellers.graphql";
import type { CurrentUserAddressesFragment_addresses$key } from "../graphql/Fragments/__generated__/CurrentUserAddressesFragment_addresses.graphql";
import type { FreeShippingPercentageFragment_freeShippingPercentage$key } from "../graphql/Fragments/__generated__/FreeShippingPercentageFragment_freeShippingPercentage.graphql";
import type { MainDepartmentsFragment_mainDepartments$key } from "../graphql/Fragments/__generated__/MainDepartmentsFragment_mainDepartments.graphql";
import type { ProductsInTheShoppingListFooterFragment_costs$key } from "../graphql/Fragments/__generated__/ProductsInTheShoppingListFooterFragment_costs.graphql";
import type { ProductsInTheShoppingListFragment_shoppingListDetails$key } from "../graphql/Fragments/__generated__/ProductsInTheShoppingListFragment_shoppingListDetails.graphql";
import ProductsInTheShoppingListFragment from "../graphql/Fragments/ProductsInTheShoppingListFragment";
import Loading from "./Loading";
import ProductInShoppingListItem from "./ProductInShoppingListItem";
import ProductsInTheShoppingListFooter from "./ProductsInTheShoppingListFooter";
import ProductsInTheShoppingListHeader from "./ProductsInTheShoppingListHeader";

interface ProductsInTheShoppingListProps {
  addresses: CurrentUserAddressesFragment_addresses$key;
  bestSellers: BestSellersFragment_bestSellers$key;
  costs: ProductsInTheShoppingListFooterFragment_costs$key;
  currentUserID: string;
  freeShippingPercentage: FreeShippingPercentageFragment_freeShippingPercentage$key;
  mainDepartments: MainDepartmentsFragment_mainDepartments$key;
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
      ListFooterComponent={
        hasNext ? (
          isLoadingNext ? (
            <Loading />
          ) : null
        ) : (
          <ProductsInTheShoppingListFooter
            addresses={props.addresses}
            bestSellers={props.bestSellers}
            costs={props.costs}
          />
        )
      }
      ListHeaderComponent={
        <ProductsInTheShoppingListHeader
          freeShippingPercentage={props.freeShippingPercentage}
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
          productsInTheShoppingListID={data.shoppingListDetails.__id}
        />
      )}
      w={"100%"}
    />
  );
}

export default ProductsInTheShoppingList;
