import { graphql } from "react-relay/hooks";

export default graphql`
  fragment SubDepartmentsFragment_subDepartments on MainDepartment
  @argumentDefinitions(
    first: { type: "Int!", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "SubDepartments") {
    subDepartmentsByDepartmentId(first: $first, after: $after)
      @connection(key: "SubDepartmentsFragment_subDepartmentsByDepartmentId") {
      edges {
        node {
          id
          ...SubDepartmentFragment_subDepartment
        }
      }
    }
  }
`;
