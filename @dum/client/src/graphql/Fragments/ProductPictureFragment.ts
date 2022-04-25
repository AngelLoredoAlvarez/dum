import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment ProductPictureFragment_productPicture on Query
  @refetchable(queryName: "ProductPictureRefetchableQuery")
  @argumentDefinitions(
    productId: { type: "UUID!" }
    pictureId: { type: "UUID" }
  ) {
    productPicture(productId: $productId, pictureId: $pictureId) {
      id
      rowId
      pictureUrl
    }
  }
`;
