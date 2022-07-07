import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment UserAddressesListFragment_userAddresses on User
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "UserAddressesList") {
    userAddresses(first: $first, after: $after)
      @connection(key: "UserAddressesListFragment_userAddresses") {
      edges {
        node {
          id
          ...UserAddressListItemFragment_address
        }
      }
    }
  }
`;
