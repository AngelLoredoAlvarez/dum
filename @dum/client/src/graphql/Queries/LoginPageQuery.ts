import { graphql } from "react-relay/hooks";

export default graphql`
  query LoginPageQuery {
    currentUser {
      id
      rowId
      ...CurrentUserFragment_user
    }
  }
`;
