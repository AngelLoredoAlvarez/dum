import { graphql } from "react-relay/hooks";

export default graphql`
  fragment PostFragment_post on Post {
    id
    rowId
    headline
    body
    fullDate
    age
  }
`;
