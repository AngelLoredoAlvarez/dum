import graphql from "babel-plugin-relay/macro";

export default graphql`
  query ForgotPasswordQuery {
    ...CurrentUserFragment_user
  }
`;
