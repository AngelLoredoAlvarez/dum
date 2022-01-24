import { graphql } from "react-relay/hooks";

export default graphql`
  query LoginPageQuery {
    currentUser {
      ...CurrentUserFragment_user
    }
  }
`;
