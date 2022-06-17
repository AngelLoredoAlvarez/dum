import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment ProductsInTheShoppingListFooterFragment_costs on Query {
    currentUserOpenedShoppingList {
      id
      rowId
      amountToReachFreeShipping
      totalToPay
    }
  }
`;
