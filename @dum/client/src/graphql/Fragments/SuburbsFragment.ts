import { graphql } from "react-relay/hooks";

export default graphql`
  fragment SuburbsFragment_suburbs on Query
  @refetchable(queryName: "SuburbsRefetchableQuery")
  @argumentDefinitions(townId: { type: "UUID" }, search: { type: "String" }) {
    suburbsByTownId(townId: $townId, search: $search) {
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
