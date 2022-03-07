import { graphql } from "react-relay/hooks";

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
