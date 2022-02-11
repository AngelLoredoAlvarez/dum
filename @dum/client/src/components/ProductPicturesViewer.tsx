import { Box, HStack, Image, Pressable, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { ProductPicturesFragment_productPictures$key } from "../graphql/Fragments/__generated__/ProductPicturesFragment_productPictures.graphql";
import ProductPicturesFragment from "../graphql/Fragments/ProductPicturesFragment";

interface ProductPicturesViewerProps {
  productPictures: ProductPicturesFragment_productPictures$key;
}

function ProductPicturesViewer(props: ProductPicturesViewerProps) {
  const productPictures = useFragment(
    ProductPicturesFragment,
    props.productPictures
  );

  return (
    <HStack flex={1} flexGrow={1}>
      <VStack h={"100%"} w={"10%"}>
        {productPictures.productPictures.edges.map(({ node }) => (
          <Pressable h={"15%"} key={node.id} w={"100%"}>
            {({ isHovered }) => (
              <Image
                h={"100%"}
                source={{
                  uri: `${node.pictureUrl}`,
                }}
                style={{
                  transform: [
                    {
                      scale: isHovered ? 1 : 0.96,
                    },
                  ],
                }}
                w={"100%"}
              />
            )}
          </Pressable>
        ))}
      </VStack>
      <Box borderWidth={1} flex={1} flexGrow={1} />
    </HStack>
  );
}

export default ProductPicturesViewer;
