import { Heading, Image, Pressable, Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { ProductLikeTheLastAddedProductFragment_productLikeTheLastAddedProduct$key } from "../graphql/Fragments/__generated__/ProductLikeTheLastAddedProductFragment_productLikeTheLastAddedProduct.graphql";
import ProductLikeTheLastAddedProductFragment from "../graphql/Fragments/ProductLikeTheLastAddedProductFragment";

interface ProductLikeTheLastAddedProductListItemProps {
  productLikeTheLastAddedProduct: ProductLikeTheLastAddedProductFragment_productLikeTheLastAddedProduct$key;
}

function ProductLikeTheLastAddedProductItem(
  props: ProductLikeTheLastAddedProductListItemProps
) {
  const productLikeTheLastAddedProduct =
    useFragment<ProductLikeTheLastAddedProductFragment_productLikeTheLastAddedProduct$key>(
      ProductLikeTheLastAddedProductFragment,
      props.productLikeTheLastAddedProduct
    );

  return (
    <Pressable>
      {({ isHovered }) => (
        <VStack
          _dark={{ backgroundColor: "gray.700" }}
          _light={{ backgroundColor: "coolGray.50" }}
          alignContent={"center"}
          alignItems={"center"}
          alignSelf={"center"}
          h={"450"}
          mb={5}
          ml={{
            base: 4,
            sm: 4,
            md: 4,
            lg: 4,
            xl: 4,
            "2xl": 44,
          }}
          overflow="hidden"
          rounded="lg"
          shadow="9"
          style={{
            transform: [
              {
                scale: isHovered ? 1 : 0.96,
              },
            ],
          }}
          space={2}
          w={{
            sm: "210",
            md: "220",
            lg: "230",
            xl: "240",
            "2xl": "250",
          }}
        >
          <Image
            alt={productLikeTheLastAddedProduct.description}
            h={"70%"}
            source={{
              uri: `${productLikeTheLastAddedProduct.productPictures.edges[0].node.pictureUrl}`,
            }}
            w={"100%"}
          />
          <Heading
            fontSize={{
              base: "sm",
              sm: "sm",
              md: "sm",
              lg: "md",
              xl: "lg",
              "2xl": "xl",
            }}
            textAlign={"center"}
          >
            {productLikeTheLastAddedProduct.brand.brand}
          </Heading>
          <Text fontSize={"sm"} textAlign={"center"}>
            {productLikeTheLastAddedProduct.description}
          </Text>
          <Text bold fontSize={"sm"} textAlign={"center"}>
            {productLikeTheLastAddedProduct.price}
          </Text>
        </VStack>
      )}
    </Pressable>
  );
}

export default ProductLikeTheLastAddedProductItem;
