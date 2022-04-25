import graphql from "babel-plugin-relay/macro";

export default graphql`
  query StorePageQuery {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
    }
    ...MainDepartmentsFragment_mainDepartments
    ...BestSellersFragment_bestSellers
  }
`;
