import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation DeleteFromShoppingListMutation(
    $DeleteFromShoppingListInput: DeleteFromShoppingListInput!
  ) {
    deleteFromShoppingList(input: $DeleteFromShoppingListInput) {
      shoppingList {
        id
        rowId
        amountToReachFreeShipping
        totalToPay
      }
    }
  }
`;
