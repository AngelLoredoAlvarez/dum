import { Box, HStack, Image, Pressable, VStack } from "native-base";
import * as React from "react";

interface ProductPicturesViewerProps {
  productPictures: Array<any>;
}

function ProductPicturesViewer(props: ProductPicturesViewerProps) {
  return (
    <HStack flex={1} flexGrow={1}>
      <VStack borderWidth={1} h={"100%"} w={"10%"}>
        {props.productPictures.map(({ node }) => (
          <Pressable h={"15%"} key={node.id} w={"100%"}>
            {({ isHovered }) => (
              <Image
                alt={node.id}
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
      <Box borderWidth={1} flex={1} flexGrow={1}></Box>
    </HStack>
  );
}

export default ProductPicturesViewer;
