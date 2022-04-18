import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  fragment SubDepartmentProductsFragment_products on SubDepartment
  @argumentDefinitions(
    first: { type: "Int!", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "SubDepartmentProducts") {
    products(first: $first, after: $after)
      @connection(key: "SubDepartmentProductsFragment_products") {
      edges {
        node {
          id
          ...ProductFragment_product
        }
      }
    }
  }
`;
