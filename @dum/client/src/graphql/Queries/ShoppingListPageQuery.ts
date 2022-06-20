import graphql from "babel-plugin-relay/macro";

export default graphql`
  query ShoppingListPageQuery {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
    }
    ...FreeShippingPercentageFragment_freeShippingPercentage
    ...MainDepartmentsFragment_mainDepartments
    ...ProductsInTheShoppingListFragment_productsInTheShoppingList
    ...ProductsInTheShoppingListFooterFragment_costs
  }
`;
