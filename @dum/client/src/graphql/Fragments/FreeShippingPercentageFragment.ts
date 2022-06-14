import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment FreeShippingPercentageFragment_freeShippingPercentage on Query {
    currentUserOpenedShoppingList {
      percentageFreeShipping
      amountToReachFreeShipping
    }
  }
`;
