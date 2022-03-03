import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductInShoppingListItemFragment_productInShoppingList on ShoppingListDetail {
    id
    rowId
    product {
      description
    }
    quantity
    cost
  }
`;
