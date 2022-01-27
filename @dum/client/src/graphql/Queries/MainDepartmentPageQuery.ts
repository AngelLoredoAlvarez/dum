import { graphql } from "react-relay/hooks";

export default graphql`
  query MainDepartmentPageQuery {
    currentUser {
      ...CurrentUserFragment_user
    }
    ...MainDepartmentsFragment_mainDepartments
  }
`;
