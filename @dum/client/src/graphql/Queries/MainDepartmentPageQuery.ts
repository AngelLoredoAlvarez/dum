import { graphql } from "react-relay/hooks";

export default graphql`
  query MainDepartmentPageQuery($mainDepartment: String!) {
    ...CurrentUserFragment_user
    ...MainDepartmentsFragment_mainDepartments
    mainDepartmentByName(arg0: $mainDepartment) {
      id
      rowId
      mainDepartment
      ...SubDepartmentsFragment_subDepartments
    }
  }
`;
