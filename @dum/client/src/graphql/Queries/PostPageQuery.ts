import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  query PostPageQuery($rowId: UUID!) {
    ...CurrentUserFragment_user
    post(rowId: $rowId) {
      ...PostFragment_post
    }
  }
`;
