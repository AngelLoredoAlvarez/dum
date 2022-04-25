import graphql from "babel-plugin-relay/macro";

export default graphql`
  query IndexPageQuery {
    ...CurrentUserFragment_user
    ...PostsFragment_posts
  }
`;
