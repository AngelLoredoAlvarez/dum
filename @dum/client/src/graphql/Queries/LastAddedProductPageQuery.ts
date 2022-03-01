import { graphql } from "react-relay/hooks";

export default graphql`
  query LastAddedProductPageQuery {
    ...CurrentUserFragment_user
    ...MainDepartmentsFragment_mainDepartments
  }
`;
