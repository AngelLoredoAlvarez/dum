import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductPictureFragment_productPicture on Product
  @argumentDefinitions(pictureId: { type: "UUID" })
  @refetchable(queryName: "ProductPictureFragment") {
    pictureById(pictureId: $pictureId) {
      id
      rowId
      pictureUrl
    }
  }
`;
