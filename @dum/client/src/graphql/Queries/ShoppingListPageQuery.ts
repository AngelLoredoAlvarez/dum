import { graphql } from "react-relay/hooks";

export default graphql`
  query ShoppingListPageQuery {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
    }
    ...MainDepartmentsFragment_mainDepartments
    ...ProductsInTheShoppingListFragment_productsInTheShoppingList
  }
`;
