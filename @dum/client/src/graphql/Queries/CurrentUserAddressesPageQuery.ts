import graphql from "babel-plugin-relay/macro";

export default graphql`
  query CurrentUserAddressesPageQuery {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
      ...CurrentUserAddressesListFragment_currentUserAddresses
      ...CurrentUserFullMainAddressFragment_currentUserFullMainAddress
    }
  }
`;
