import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  query LoginPageQuery {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
    }
  }
`;
