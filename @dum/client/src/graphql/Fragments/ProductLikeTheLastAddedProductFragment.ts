import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment ProductLikeTheLastAddedProductFragment_productLikeTheLastAddedProduct on Product {
    id
    rowId
    brand {
      id
      brand
    }
    subDepartment {
      subDepartment
      department {
        mainDepartment
      }
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
