import { graphql } from "react-relay/hooks";

export default graphql`
  query RegisterPageQuery {
    ...CurrentUserFragment_user
    ...TownsFragment_towns
  }
`;
