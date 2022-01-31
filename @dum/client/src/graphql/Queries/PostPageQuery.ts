import { graphql } from "react-relay/hooks";

export default graphql`
  query PostPageQuery($rowId: UUID!) {
    currentUser {
      ...CurrentUserFragment_user
    }
    post(rowId: $rowId) {
      id
      rowId
      ...PostFragment_post
    }
  }
`;
