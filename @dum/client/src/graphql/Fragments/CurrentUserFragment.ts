import { graphql } from "react-relay/hooks";

export default graphql`
  fragment CurrentUserFragment_user on Query {
    currentUser {
      id
      rowId
      avatarUrl
      fullName
      shoppingListProductsCount
    }
  }
`;
