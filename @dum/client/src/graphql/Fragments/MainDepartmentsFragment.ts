import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment MainDepartmentsFragment_mainDepartments on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "MainDepartments") {
    mainDepartments(first: $first, after: $after)
      @connection(key: "MainDepartmentsFragment_mainDepartments") {
      edges {
        node {
          id
          rowId
          mainDepartment
        }
      }
    }
  }
`;
