import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment CurrentUserFragment_user on Query {
    currentUser {
      id
      rowId
      avatarUrl
      isVerified
      fullName
      shoppingListProductsCount
    }
  }
`;
