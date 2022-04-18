import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  fragment ProductsInTheShoppingListFragment_productsInTheShoppingList on Query
  @argumentDefinitions(
    first: { type: "Int!", defaultValue: 3 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "ProductsInTheShoppingList") {
    productsInTheShoppingList(first: $first, after: $after)
      @connection(
        key: "ProductsInTheShoppingListFragment_productsInTheShoppingList"
      ) {
      __id
      edges {
        node {
          id
          ...ProductInShoppingListItemFragment_productInShoppingList
        }
      }
    }
  }
`;
