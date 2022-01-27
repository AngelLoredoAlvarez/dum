import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, Image, Stack, Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { ProductFragment_product$key } from "../graphql/Fragments/__generated__/ProductFragment_product.graphql";
import ProductFragment from "../graphql/Fragments/ProductFragment";

interface ProductSwiperItemProps {
  product: ProductFragment_product$key;
}

function ProductSwiperItem(props: ProductSwiperItemProps) {
  const product = useFragment(ProductFragment, props.product);

  return (
    <Box h={"100%"} w={"100%"}>
      <Stack
        _dark={{ backgroundColor: "gray.700", borderColor: "gray.700" }}
        _light={{ backgroundColor: "coolGray.50", borderColor: "gray.300" }}
        direction={{
          base: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
          "2xl": "row",
        }}
        flex={1}
        overflow="hidden"
        rounded="lg"
      >
        <Box flex={1}>
          <Image
            alt={product.description}
            h={"100%"}
            source={{
              uri: `${product.pictureUrl}`,
            }}
            w={"100%"}
          />
        </Box>
        <VStack
          alignItems={"center"}
          alignSelf={"center"}
          flex={1}
          mt={3}
          space={{
            base: 3,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 3,
            "2xl": 8,
          }}
        >
          <Text
            _dark={{
              bg: "coolGray.800",
            }}
            _light={{
              bg: "gray.300",
              color: "gray.900",
            }}
            fontSize={{
              base: "sm",
              sm: "sm",
              md: "md",
              lg: "md",
              xl: "md",
              "2xl": "lg",
            }}
          >
            {product.brand}
          </Text>
          <Text
            fontSize={{
              base: "sm",
              sm: "sm",
              md: "md",
              lg: "md",
              xl: "md",
              "2xl": "2xl",
            }}
            textAlign={"center"}
          >
            {product.description}
          </Text>
          <Text strikeThrough>{product.price}</Text>
          <Text
            _dark={{
              bg: "coolGray.800",
            }}
            _light={{
              bg: "red.700",
              color: "white",
            }}
            bold
            fontSize={{
              base: "sm",
              sm: "sm",
              md: "md",
              lg: "md",
              xl: "md",
              "2xl": "2xl",
            }}
          >
            {product.price}
          </Text>
          <Button
            colorScheme="amber"
            rightIcon={
              <MaterialIcons color="white" name="add-shopping-cart" size={20} />
            }
          >
            Agregar al Carrito
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
}

export default ProductSwiperItem;
