import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment PostsFragment_posts on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "Posts") {
    posts(first: $first, after: $after)
      @connection(key: "PostsFragment_posts") {
      edges {
        node {
          id
          ...PostFragment_post
        }
      }
    }
  }
`;
