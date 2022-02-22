import { graphql } from "react-relay/hooks";

export default graphql`
  query ProductPageQuery($rowId: UUID!) {
    ...CurrentUserFragment_user
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
