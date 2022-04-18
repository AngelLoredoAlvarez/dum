import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  mutation LoginMutation($LoginInput: LoginInput!) {
    login(input: $LoginInput) {
      user {
        id
        fullName
      }
    }
  }
`;
