import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductFragment_product on Product {
    id
    brand
    description
    pictureUrl
    price
  }
`;
