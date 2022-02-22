import { graphql } from "react-relay/hooks";

export default graphql`
  fragment BestSellersFragment_bestSellers on Query {
    currentUser {
      id
      rowId
      fullName
    }
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
