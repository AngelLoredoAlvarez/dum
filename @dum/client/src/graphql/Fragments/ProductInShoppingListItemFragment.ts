import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductInShoppingListItemFragment_productInShoppingList on ShoppingListDetail {
    id
    rowId
    product {
      id
      rowId
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
      subDepartment {
        subDepartment
        department {
          mainDepartment
        }
      }
    }
    quantity
    cost
  }
`;
