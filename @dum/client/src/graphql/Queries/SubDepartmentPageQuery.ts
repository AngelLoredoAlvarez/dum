import graphql from "babel-plugin-relay/macro";

export default graphql`
  query SubDepartmentPageQuery($subDepartment: String!) {
    ...CurrentUserFragment_user
    ...MainDepartmentsFragment_mainDepartments
    subDepartmentByName(arg0: $subDepartment) {
      ...SubDepartmentFragment_subDepartment
      ...SubDepartmentProductsFragment_products
    }
  }
`;
