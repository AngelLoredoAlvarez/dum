import graphql from "babel-plugin-relay/macro";

export default graphql`
  subscription CurrentUserUpdatedSubscription {
    currentUserUpdated {
      event
      user {
        id
        rowId
        avatarUrl
        isVerified
        fullName
      }
    }
  }
`;
