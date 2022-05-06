import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation ResetPasswordMutation($ResetPasswordInput: ResetPasswordInput!) {
    resetPassword(input: $ResetPasswordInput) {
      success
    }
  }
`;
