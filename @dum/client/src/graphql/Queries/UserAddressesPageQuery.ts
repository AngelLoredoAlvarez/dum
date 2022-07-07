import graphql from "babel-plugin-relay/macro";

export default graphql`
  query UserAddressesPageQuery {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
      ...UserAddressesListFragment_userAddresses
    }
  }
`;
