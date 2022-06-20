import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment FreeShippingPercentageFragment_freeShippingPercentage on ShoppingList {
    percentageFreeShipping
    amountToReachFreeShipping
  }
`;
