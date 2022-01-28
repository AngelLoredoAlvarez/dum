import { graphql } from "react-relay/hooks";

export default graphql`
  query MainDepartmentPageQuery($rowId: UUID!) {
    currentUser {
      ...CurrentUserFragment_user
    }
    ...MainDepartmentsFragment_mainDepartments
    mainDepartment(rowId: $rowId) {
      id
      rowId
      mainDepartment
      ...SubDepartmentsFragment_subDepartments
    }
  }
`;
