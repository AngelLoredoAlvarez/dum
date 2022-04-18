import { graphql } from "babel-plugin-relay/macro";

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
