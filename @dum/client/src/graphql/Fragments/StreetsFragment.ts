import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  fragment StreetsFragment_streets on Query
  @refetchable(queryName: "StreetsRefetchableQuery")
  @argumentDefinitions(suburbId: { type: "UUID" }) {
    streetsBySuburbId(suburbId: $suburbId) {
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
