import { graphql } from "react-relay/hooks";

export default graphql`
  fragment PostFragment_post on Post {
    id
    headline
    body
    topic
    date
    fullDate
    time
    age
  }
`;
