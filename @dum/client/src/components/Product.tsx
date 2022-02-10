import { Box, Button, HStack, Image, Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay";

import { ProductFragment_product$key } from "../graphql/Fragments/__generated__/ProductFragment_product.graphql";
import ProductFragment from "../graphql/Fragments/ProductFragment";

interface ProductProps {
  product: ProductFragment_product$key;
}

function Product(props: ProductProps) {
  const product = useFragment(ProductFragment, props.product);

  return (
    <HStack
      borderWidth={1}
      borderColor={"red.300"}
      flexGrow={1}
      h={"100%"}
      ml={40}
      mr={40}
    >
      <Box borderWidth={1} h={"100%"} w={"5%"} />
      <Box h={"100%"} w={"60%"}>
        <Image
          alt={product.description}
          h={"full"}
          source={{ uri: `${product.pictureUrl}` }}
          w={"full"}
        />
      </Box>
      <VStack
        alignContent={"center"}
        alignItems={"center"}
        alignSelf={"center"}
        borderWidth={1}
        flexGrow={1}
        h={"100%"}
        space={10}
      >
        <Text>{product.brand.brand}</Text>
        <Text>{product.description}</Text>
        <Text>{product.price}</Text>
        <Text>{product.stock}</Text>
        <Button>Agregar al Carrito</Button>
      </VStack>
    </HStack>
  );
}

export default Product;
