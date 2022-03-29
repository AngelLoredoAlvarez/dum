import { graphql } from "react-relay/hooks";

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
