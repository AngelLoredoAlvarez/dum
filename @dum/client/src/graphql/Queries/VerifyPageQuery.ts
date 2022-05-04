import graphql from "babel-plugin-relay/macro";

export default graphql`
  query VerifyPageQuery {
    ...CurrentUserFragment_user
  }
`;
