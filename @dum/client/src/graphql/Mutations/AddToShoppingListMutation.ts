import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation AddToShoppingListMutation(
    $AddToShoppingListInput: AddToShoppingListInput!
  ) {
    addToShoppingList(input: $AddToShoppingListInput) {
      shoppingList {
        amountToReachFreeShipping
        totalToPay
      }
      shoppingListDetail {
        id
        rowId
        product {
          description
        }
        quantity
        cost
      }
    }
  }
`;
