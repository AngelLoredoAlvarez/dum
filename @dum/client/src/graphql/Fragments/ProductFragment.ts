import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductFragment_product on Product {
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
    ...ProductPicturesFragment_productPictures
    price
    stock
  }
`;
