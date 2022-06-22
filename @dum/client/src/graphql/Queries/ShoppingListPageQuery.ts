import graphql from "babel-plugin-relay/macro";

export default graphql`
  query ShoppingListPageQuery {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
      ...CurrentUserAddressesFragment_addresses
    }
    ...MainDepartmentsFragment_mainDepartments
    currentUserOpenedShoppingList {
      ...FreeShippingPercentageFragment_freeShippingPercentage
      ...ProductsInTheShoppingListFragment_shoppingListDetails
      ...ProductsInTheShoppingListFooterFragment_costs
    }
  }
`;
