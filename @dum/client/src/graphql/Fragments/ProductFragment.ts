import graphql from "babel-plugin-relay/macro";

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
    price
    stock
  }
`;
