import { Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { ProductInShoppingListItemFragment_productInShoppingList$key } from "../graphql/Fragments/__generated__/ProductInShoppingListItemFragment_productInShoppingList.graphql";
import ProductInShoppingListItemFragment from "../graphql/Fragments/ProductInShoppingListItemFragment";

interface ProductInShoppingListItemProps {
  productInShoppingList: ProductInShoppingListItemFragment_productInShoppingList$key;
}

function ProductInShoppingListItem(props: ProductInShoppingListItemProps) {
  const productInShoppingList =
    useFragment<ProductInShoppingListItemFragment_productInShoppingList$key>(
      ProductInShoppingListItemFragment,
      props.productInShoppingList
    );

  return (
    <VStack>
      <Text>{productInShoppingList.product.description}</Text>
      <Text>{productInShoppingList.quantity}</Text>
      <Text>{productInShoppingList.cost}</Text>
    </VStack>
  );
}

export default ProductInShoppingListItem;
