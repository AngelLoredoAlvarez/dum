import { graphql } from "react-relay/hooks";

export default graphql`
  query IndexPageQuery {
    ...CurrentUserFragment_user
    ...PostsFragment_posts
  }
`;
