import { graphql } from "react-relay/hooks";

export default graphql`
  mutation CreateShoppingListMutation(
    $CreateShoppingListInput: CreateShoppingListInput!
  ) {
    createShoppingList(input: $CreateShoppingListInput) {
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
