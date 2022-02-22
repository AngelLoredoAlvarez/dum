import { graphql } from "react-relay/hooks";

export default graphql`
  query StorePageQuery {
    ...CurrentUserFragment_user
    ...MainDepartmentsFragment_mainDepartments
    ...BestSellersFragment_bestSellers
  }
`;
