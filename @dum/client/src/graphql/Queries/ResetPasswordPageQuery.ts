import graphql from "babel-plugin-relay/macro";

export default graphql`
  query ResetPasswordPageQuery {
    ...CurrentUserFragment_user
  }
`;
