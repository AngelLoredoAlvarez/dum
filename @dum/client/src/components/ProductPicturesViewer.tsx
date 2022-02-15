import { Box, HStack, Image, Pressable, VStack } from "native-base";
import * as React from "react";
import { useRefetchableFragment } from "react-relay/hooks";

import { ProductPictureFragment_productPicture$key } from "../graphql/Fragments/__generated__/ProductPictureFragment_productPicture.graphql";
import ProductPictureFragment from "../graphql/Fragments/ProductPictureFragment";

interface ProductPicturesViewerProps {
  productPicture: ProductPictureFragment_productPicture$key;
  productPictures: Array<any>;
}

function ProductPicturesViewer(props: ProductPicturesViewerProps) {
  const [data, refetch] = useRefetchableFragment(
    ProductPictureFragment,
    props.productPicture
  );

  return (
    <HStack flex={1} flexGrow={1}>
      <VStack borderWidth={1} h={"100%"} w={"10%"}>
        {props.productPictures.map(({ node }) => (
          <Pressable
            h={"15%"}
            key={node.id}
            onPress={() => refetch({ pictureId: node.rowId })}
            w={"100%"}
          >
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
      <Box borderWidth={1} flex={1} flexGrow={1}>
        <Image
          alt={data.pictureById.id}
          h={"100%"}
          source={{
            uri: `${data.pictureById.pictureUrl}`,
          }}
          w={"100%"}
        />
      </Box>
    </HStack>
  );
}

export default ProductPicturesViewer;
