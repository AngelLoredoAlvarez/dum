import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment UserAddressListItemFragment_address on UserAddress {
    id
    rowId
    fullAddress
  }
`;
