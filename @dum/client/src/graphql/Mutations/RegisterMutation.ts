import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation RegisterMutation($RegisterInput: RegisterInput!) {
    register(input: $RegisterInput) {
      user {
        id
        rowId
        fullName
      }
    }
  }
`;
