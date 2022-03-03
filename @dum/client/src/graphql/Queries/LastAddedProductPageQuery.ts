import { graphql } from "react-relay/hooks";

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
  }
`;
