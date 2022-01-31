import { graphql } from "react-relay/hooks";

export default graphql`
  query IndexPageQuery {
    currentUser {
      ...CurrentUserFragment_user
    }
    posts {
      edges {
        node {
          id
          rowId
          ...PostFragment_post
        }
      }
    }
  }
`;
