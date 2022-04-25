import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment SuburbsFragment_suburbs on Query
  @refetchable(queryName: "SuburbsRefetchableQuery")
  @argumentDefinitions(townId: { type: "UUID" }) {
    suburbsByTownId(townId: $townId) {
      edges {
        node {
          id
          rowId
          name
        }
      }
    }
  }
`;
