import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment CurrentUserAddressesListFragment_currentUserAddresses on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "UserAddressesList") {
    userAddresses(first: $first, after: $after)
      @connection(key: "CurrentUserAddressesListFragment_userAddresses") {
      edges {
        node {
          id
          ...CurrentUserAddressListItemFragment_currentUserAddress
        }
      }
    }
  }
`;
