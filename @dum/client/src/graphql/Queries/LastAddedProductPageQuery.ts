import graphql from "babel-plugin-relay/macro";

export default graphql`
  query LastAddedProductPageQuery {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
    }
    ...MainDepartmentsFragment_mainDepartments
    lastAddedProductInTheShoppingList {
      ...LastAddedProductInTheShoppingListFragment_lastAddedProduct
    }
    ...ProductsLikeTheLastAddedProductListFragment_productsLikeTheLastAddedProductList
  }
`;
