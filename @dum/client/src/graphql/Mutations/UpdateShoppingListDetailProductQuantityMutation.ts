import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation UpdateShoppingListDetailProductQuantityMutation(
    $UpdateShoppingListDetailProductQuantityInput: UpdateShoppingListDetailProductQuantityInput!
  ) {
    updateShoppingListDetailProductQuantity(
      input: $UpdateShoppingListDetailProductQuantityInput
    ) {
      shoppingList {
        id
        rowId
        user {
          shoppingListProductsCount
        }
        percentageFreeShipping
        amountToReachFreeShipping
        totalToPay
      }
      shoppingListDetail {
        id
        rowId
        quantity
        cost
      }
    }
  }
`;
