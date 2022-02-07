import { graphql } from "react-relay/hooks";

export default graphql`
  query MainDepartmentPageQuery($mainDepartment: String!) {
    currentUser {
      ...CurrentUserFragment_user
    }
    ...MainDepartmentsFragment_mainDepartments
    mainDepartmentByName(arg0: $mainDepartment) {
      id
      rowId
      mainDepartment
      ...SubDepartmentsFragment_subDepartments
    }
  }
`;
