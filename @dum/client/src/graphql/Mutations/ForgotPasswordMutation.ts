import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation ForgotPasswordMutation($ForgotPasswordInput: ForgotPasswordInput!) {
    forgotPassword(input: $ForgotPasswordInput) {
      clientMutationId
    }
  }
`;
