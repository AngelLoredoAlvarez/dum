import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment ProductsInTheShoppingListFooterFragment_costs on ShoppingList {
    amountToReachFreeShipping
    totalToPay
  }
`;
