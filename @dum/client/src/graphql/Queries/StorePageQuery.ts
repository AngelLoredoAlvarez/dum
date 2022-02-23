import { graphql } from "react-relay/hooks";

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
