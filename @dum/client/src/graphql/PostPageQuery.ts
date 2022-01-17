import { graphql } from "react-relay/hooks";

export default graphql`
  query PostPageQuery($id: UUID!) {
    currentUser {
      ...CurrentUserFragment_user
    }
    post(id: $id) {
      ...PostFragment_post
    }
  }
`;
