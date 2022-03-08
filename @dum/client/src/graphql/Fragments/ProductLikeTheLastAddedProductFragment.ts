import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductLikeTheLastAddedProductFragment_productLikeTheLastAddedProduct on Product {
    id
    rowId
    brand {
      id
      brand
    }
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
    price
    stock
  }
`;