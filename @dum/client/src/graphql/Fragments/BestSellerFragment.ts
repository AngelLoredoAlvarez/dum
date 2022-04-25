import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment BestSellerFragment_bestSeller on Product {
    id
    subDepartment {
      subDepartment
      department {
        mainDepartment
      }
    }
    rowId
    brand {
      brand
    }
    description
    price
    productPictures {
      edges {
        node {
          pictureUrl
        }
      }
    }
  }
`;
