import { graphql } from "react-relay/hooks";

export default graphql`
  query AddedProductPageQuery {
    ...CurrentUserFragment_user
    ...MainDepartmentsFragment_mainDepartments
  }
`;
