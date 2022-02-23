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
      h={{
        base: "45%",
        sm: "45%",
        md: "43%",
        lg: "100%",
        xl: "100%",
        "2xl": "100%",
      }}
      w={{
        base: "95%",
        sm: "95%",
        md: "97%",
        lg: "40%",
        xl: "40%",
        "2xl": "40%",
      }}
    >
      <Image
        alt={data.productPicture.id}
        h={"100%"}
        source={{ uri: `${data.productPicture.pictureUrl}` }}
        w={"100%"}
      />
    </Box>
  );
}

export default ProductPicture;
