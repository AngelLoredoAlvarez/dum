import { Box, Image } from "native-base";
import * as React from "react";
import { useRefetchableFragment } from "react-relay/hooks";

import { ProductPictureFragment_productPicture$key } from "../graphql/Fragments/__generated__/ProductPictureFragment_productPicture.graphql";
import ProductPictureFragment from "../graphql/Fragments/ProductPictureFragment";

interface ProductPictureProps {
  pictureId: any;
  productPicture: ProductPictureFragment_productPicture$key;
}

function ProductPicture(props: ProductPictureProps) {
  const [data, refetch] = useRefetchableFragment(
    ProductPictureFragment,
    props.productPicture
  );

  React.useEffect(() => {
    refetch({ pictureId: props.pictureId });
  }, [props.pictureId, refetch]);

  return (
    <Box
      flex={1}
      h={{
        base: "60%",
        sm: "60%",
        md: "58%",
        lg: "100%",
        xl: "100%",
        "2xl": "100%",
      }}
      w={{
        base: "95%",
        sm: "95%",
        md: "97%",
        lg: null,
        xl: null,
        "2xl": null,
      }}
    >
      <Image
        alt={data.productPicture.id}
        flex={1}
        source={{ uri: `${data.productPicture.pictureUrl}` }}
      />
    </Box>
  );
}

export default ProductPicture;
