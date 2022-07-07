import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment CurrentUserAddressListItemFragment_currentUserAddress on UserAddress {
    id
    rowId
    fullAddress
  }
`;
