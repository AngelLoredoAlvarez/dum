import { graphql } from "babel-plugin-relay/macro";

export default graphql`
  fragment TownsFragment_towns on Query
  @argumentDefinitions(first: { type: "Int" }, after: { type: "Cursor" })
  @refetchable(queryName: "Towns") {
    towns(first: $first, after: $after)
      @connection(key: "TownsFragment_towns") {
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
