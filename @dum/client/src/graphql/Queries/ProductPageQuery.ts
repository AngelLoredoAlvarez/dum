import graphql from "babel-plugin-relay/macro";

export default graphql`
  query ProductPageQuery($rowId: UUID!) {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
    }
    ...MainDepartmentsFragment_mainDepartments
    product(rowId: $rowId) {
      productPictures {
        edges {
          node {
            id
            rowId
            pictureUrl
          }
        }
      }
      ...ProductFragment_product
    }
    ...ProductPictureFragment_productPicture @arguments(productId: $rowId)
  }
`;
