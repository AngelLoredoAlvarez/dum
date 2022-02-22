import { graphql } from "react-relay/hooks";

export default graphql`
  query LoginPageQuery {
    ...CurrentUserFragment_user
  }
`;
