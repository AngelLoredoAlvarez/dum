import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  mutation LogoutMutation {
    logout {
      success
    }
  }
`;
