import graphql from "babel-plugin-relay/macro";

export default graphql`
  mutation AddToShoppingListMutation(
    $AddToShoppingListInput: AddToShoppingListInput!
  ) {
    addToShoppingList(input: $AddToShoppingListInput) {
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
