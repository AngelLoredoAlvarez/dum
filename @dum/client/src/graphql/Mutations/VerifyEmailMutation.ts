import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation VerifyEmailMutation($VerifyInput: VerifyEmailInput!) {
    verifyEmail(input: $VerifyInput) {
      success
    }
  }
`;
