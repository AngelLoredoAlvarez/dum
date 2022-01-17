import { graphql } from "react-relay/hooks";

export default graphql`
  mutation LogoutMutation {
    logout {
      success
    }
  }
`;
