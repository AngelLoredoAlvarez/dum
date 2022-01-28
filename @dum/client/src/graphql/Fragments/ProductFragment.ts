import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductFragment_product on Product {
    id
    rowId
    brand
    description
    pictureUrl
    price
  }
`;
