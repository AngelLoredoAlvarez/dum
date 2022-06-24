import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment BestSellersFragment_bestSellers on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "BestSellers") {
    products(first: $first, after: $after)
      @connection(key: "BestSellersFragment_products") {
      edges {
        node {
          id
          ...BestSellerFragment_bestSeller
        }
      }
    }
  }
`;
