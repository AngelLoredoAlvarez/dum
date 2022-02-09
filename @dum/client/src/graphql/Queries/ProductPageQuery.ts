import { graphql } from "react-relay/hooks";

export default graphql`
  query ProductPageQuery($rowId: UUID!) {
    currentUser {
      ...CurrentUserFragment_user
    }
    ...MainDepartmentsFragment_mainDepartments
    product(rowId: $rowId) {
      ...ProductFragment_product
    }
  }
`;
