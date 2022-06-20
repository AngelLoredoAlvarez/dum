import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment ProductsInTheShoppingListFragment_shoppingListDetails on ShoppingList
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 5 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "ProductsInTheShoppingList") {
    shoppingListDetails(first: $first, after: $after)
      @connection(
        key: "ProductsInTheShoppingListFragment_shoppingListDetails"
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
