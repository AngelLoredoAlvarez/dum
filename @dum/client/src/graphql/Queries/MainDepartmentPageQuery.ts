import { graphql } from "babel-plugin-relay/macro";

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
