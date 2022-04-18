import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  fragment LastAddedProductInTheShoppingListFragment_lastAddedProduct on ShoppingListDetail {
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
      subDepartmentId
    }
    quantity
    cost
  }
`;
