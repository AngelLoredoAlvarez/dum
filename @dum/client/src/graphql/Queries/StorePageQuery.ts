import { graphql } from "react-relay/hooks";

export default graphql`
  query StorePageQuery {
    currentUser {
      id
      rowId
      ...CurrentUserFragment_user
    }
    ...MainDepartmentsFragment_mainDepartments
    ...BestSellersFragment_bestSellers
  }
`;
