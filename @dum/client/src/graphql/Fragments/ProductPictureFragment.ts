import { graphql } from "react-relay/hooks";

export default graphql`
  fragment ProductPictureFragment_productPicture on Query
  @argumentDefinitions(
    pictureId: {
      type: "UUID"
      defaultValue: "0b7e8193-a31d-4ccf-8986-6d2e156edb99"
    }
  )
  @refetchable(queryName: "ProductPictureFragment") {
    productPicture(rowId: $pictureId) {
      id
      rowId
      pictureUrl
    }
  }
`;
