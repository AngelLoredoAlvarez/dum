import { graphql } from "react-relay/hooks";

export default graphql`
  query SubDepartmentPageQuery($subDepartment: String!) {
    currentUser {
      ...CurrentUserFragment_user
    }
    ...MainDepartmentsFragment_mainDepartments
    subDepartmentByName(arg0: $subDepartment) {
      id
      rowId
      subDepartment
      description
    }
  }
`;
