import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  fragment BestSellersFragment_bestSellers on Query {
    products(first: 10) {
      edges {
        node {
          id
          ...BestSellerFragment_bestSeller
        }
      }
    }
  }
`;
