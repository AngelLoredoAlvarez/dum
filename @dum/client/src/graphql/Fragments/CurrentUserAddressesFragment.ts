import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment CurrentUserAddressesFragment_addresses on User {
    userAddresses {
      edges {
        node {
          id
          rowId
          suburb {
            id
            rowId
            name
            zipCode
          }
          town {
            id
            rowId
            name
          }
        }
      }
    }
  }
`;
