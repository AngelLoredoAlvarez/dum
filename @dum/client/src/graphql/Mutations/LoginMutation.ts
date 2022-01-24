import { graphql } from "react-relay/hooks";

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
