import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductInShoppingListItemFragment_productInShoppingList on ShoppingListDetail {
    id
    rowId
    product {
      description
      productPictures {
        edges {
          node {
            id
            rowId
            pictureUrl
          }
        }
      }
      stock
    }
    quantity
    cost
  }
`;
