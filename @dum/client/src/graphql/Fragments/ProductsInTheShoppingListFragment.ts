import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductsInTheShoppingListFragment_productsInTheShoppingList on Query
  @argumentDefinitions(
    first: { type: "Int!", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "ProductsInTheShoppingList") {
    productsInTheShoppingList(first: $first, after: $after)
      @connection(
        key: "ProductsInTheShoppingListFragment_productsInTheShoppingList"
      ) {
      edges {
        node {
          id
          ...ProductInShoppingListItemFragment_productInShoppingList
        }
      }
    }
  }
`;
