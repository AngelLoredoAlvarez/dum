import graphql from "babel-plugin-relay";

export default graphql`
  fragment CurrentUserFullMainAddressFragment_currentUserFullMainAddress on User {
    fullAddress
  }
`;
