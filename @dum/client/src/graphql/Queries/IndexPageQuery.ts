import { graphql } from "react-relay/hooks";

export default graphql`
  query IndexPageQuery {
    currentUser {
      ...CurrentUserFragment_user
    }
    ...PostsFragment_posts
  }
`;
