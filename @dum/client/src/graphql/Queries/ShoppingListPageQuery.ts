import graphql from "babel-plugin-relay/macro";

export default graphql`
  query ShoppingListPageQuery {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
    }
    currentUserOpenedShoppingList {
      ...ProductsInTheShoppingListFragment_shoppingListDetails
    }
  }
`;
