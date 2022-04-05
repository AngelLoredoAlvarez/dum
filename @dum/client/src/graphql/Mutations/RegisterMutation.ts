import { graphql } from "react-relay";

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
