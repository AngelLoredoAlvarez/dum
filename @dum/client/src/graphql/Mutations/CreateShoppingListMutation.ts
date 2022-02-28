import { graphql } from "react-relay/hooks";

export default graphql`
  mutation CreateShoppingListMutation(
    $CreateShoppingListInput: CreateShoppingListInput!
  ) {
    createShoppingList(input: $CreateShoppingListInput) {
      shoppingListDetail {
        product {
          description
        }
        quantity
        cost
      }
    }
  }
`;
