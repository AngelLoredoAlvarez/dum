import { graphql } from "react-relay/hooks";

export default graphql`
  query StorePageQuery {
    currentUser {
      ...CurrentUserFragment_user
    }
    ...MainDepartmentsFragment_mainDepartments
    ...BestSellersFragment_bestSellers
  }
`;
