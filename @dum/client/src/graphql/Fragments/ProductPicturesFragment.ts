import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductPicturesFragment_productPictures on Product {
    productPictures {
      edges {
        node {
          id
          rowId
          pictureUrl
        }
      }
    }
  }
`;
