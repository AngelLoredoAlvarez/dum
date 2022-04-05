import { graphql } from "react-relay/hooks";

export default graphql`
  query RegisterPageQuery {
    ...CurrentUserFragment_user
    currentUser {
      id
      rowId
      fullName
    }
    towns {
      edges {
        node {
          id
          rowId
          name
        }
      }
    }
    ...SuburbsFragment_suburbs
    ...StreetsFragment_streets
  }
`;
