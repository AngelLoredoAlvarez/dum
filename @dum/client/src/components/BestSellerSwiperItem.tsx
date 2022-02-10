import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  View,
  VStack,
} from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { ProductFragment_product$key } from "../graphql/Fragments/__generated__/ProductFragment_product.graphql";
import ProductFragment from "../graphql/Fragments/ProductFragment";

interface BestSellerSwiperItemProps {
  activeIndex?: number;
  index?: number;
  isActive?: boolean;
  product: ProductFragment_product$key;
}

function BestSellerSwiperItem(props: BestSellerSwiperItemProps) {
  const product = useFragment(ProductFragment, props.product);

  return (
    <View h={"100%"} w={"100%"}>
      {props.isActive ? (
        <HStack
          _dark={{ backgroundColor: "gray.700" }}
          _light={{ backgroundColor: "coolGray.50" }}
          h={"100%"}
        >
          <Image
            alt={product.description}
            h={"100%"}
            source={{
              uri: `${product.productPictures.edges[0].node.pictureUrl}`,
            }}
            w={"50%"}
          />
          <VStack
            alignContent={"center"}
            alignItems={"center"}
            alignSelf={"center"}
            flex={1}
            space={3}
          >
            <Text
              bold
              fontSize={{
                base: 12,
                sm: 12,
                md: "sm",
                lg: "md",
                xl: "lg",
                "2xl": "xl",
              }}
              textAlign={"center"}
            >
              {product.brand.brand}
            </Text>
            <Text
              fontSize={{
                base: "md",
                sm: "md",
                md: "lg",
                lg: "xl",
                xl: "2xl",
                "2xl": "3xl",
              }}
              textAlign={"center"}
            >
              {product.description}
            </Text>
            <Text
              fontSize={{
                base: "md",
                sm: "md",
                md: "lg",
                lg: "xl",
                xl: "2xl",
                "2xl": "3xl",
              }}
              strikeThrough
            >
              {product.price} MXN
            </Text>
            <Box
              _dark={{
                backgroundColor: "gray.800",
              }}
              _light={{
                backgroundColor: "red.600",
              }}
              _text={{}}
            >
              <Text
                color={"white"}
                bold
                fontSize={{
                  base: "xl",
                  sm: "xl",
                  md: "2xl",
                  lg: "3xl",
                  xl: "4xl",
                  "2xl": "5xl",
                }}
              >
                {product.price} MXN
              </Text>
            </Box>
            <Button
              colorScheme="amber"
              rightIcon={
                <Icon as={MaterialIcons} name="add-shopping-cart" size="sm" />
              }
            >
              Agregar al Carrito
            </Button>
          </VStack>
        </HStack>
      ) : null}
    </View>
  );
}

export default BestSellerSwiperItem;
