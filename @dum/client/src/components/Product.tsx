import { Button, HStack, Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay";

import { ProductFragment_product$key } from "../graphql/Fragments/__generated__/ProductFragment_product.graphql";
import ProductFragment from "../graphql/Fragments/ProductFragment";
import ProductPicturesViewer from "./ProductPicturesViewer";

interface ProductProps {
  product: ProductFragment_product$key;
}

function Product(props: ProductProps) {
  const product = useFragment(ProductFragment, props.product);
  const productPictures = [...product.productPictures.edges];

  return (
    <HStack flex={1} flexGrow={1} mb={10} ml={48} mr={48} mt={7}>
      <ProductPicturesViewer productPictures={productPictures} />
      <VStack
        alignContent={"center"}
        alignItems={"center"}
        alignSelf={"center"}
        borderWidth={1}
        h={"100%"}
        space={10}
        w={"30%"}
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
