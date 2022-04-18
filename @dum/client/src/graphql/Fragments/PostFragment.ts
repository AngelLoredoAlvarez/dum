import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  fragment PostFragment_post on Post {
    id
    rowId
    headline
    body
    fullDate
    date
    age
  }
`;
