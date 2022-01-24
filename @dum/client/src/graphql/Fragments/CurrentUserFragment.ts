import { graphql } from "react-relay/hooks";

export default graphql`
  fragment CurrentUserFragment_user on User {
    id
    avatarUrl
    fullName
  }
`;
