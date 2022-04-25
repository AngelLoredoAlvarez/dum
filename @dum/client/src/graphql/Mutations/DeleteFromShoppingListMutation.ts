import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation DeleteFromShoppingListMutation(
    $DeleteFromShoppingListInput: DeleteFromShoppingListInput!
  ) {
    deleteFromShoppingList(input: $DeleteFromShoppingListInput) {
      shoppingListDetail {
        id
      }
    }
  }
`;
