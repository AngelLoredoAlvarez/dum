import { graphql } from "react-relay/hooks";

export default graphql`
  fragment BestSellersFragment_bestSellers on Query
  @argumentDefinitions(
    first: { type: "Int!", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "BestSellers") {
    products(first: $first, after: $after)
      @connection(key: "BestSellersFragment_products") {
      edges {
        node {
          id
          ...ProductFragment_product
        }
      }
    }
  }
`;
