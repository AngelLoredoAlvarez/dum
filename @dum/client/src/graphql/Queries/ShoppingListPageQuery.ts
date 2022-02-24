import { graphql } from "react-relay/hooks";

export default graphql`
  query ShoppingListPageQuery {
    ...CurrentUserFragment_user
  }
`;
