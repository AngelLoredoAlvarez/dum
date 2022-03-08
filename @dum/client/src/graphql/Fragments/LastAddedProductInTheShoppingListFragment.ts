import { graphql } from "react-relay/hooks";

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
