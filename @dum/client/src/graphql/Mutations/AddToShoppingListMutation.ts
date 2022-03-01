import { graphql } from "react-relay/hooks";

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
