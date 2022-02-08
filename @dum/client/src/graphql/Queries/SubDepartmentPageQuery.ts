import { graphql } from "react-relay/hooks";

export default graphql`
  query SubDepartmentPageQuery($subDepartment: String!) {
    currentUser {
      ...CurrentUserFragment_user
    }
    ...MainDepartmentsFragment_mainDepartments
    subDepartmentByName(arg0: $subDepartment) {
      ...SubDepartmentFragment_subDepartment
      ...SubDepartmentProductsFragment_products
    }
  }
`;
