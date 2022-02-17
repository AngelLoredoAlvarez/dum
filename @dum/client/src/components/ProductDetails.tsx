import { MaterialIcons } from "@expo/vector-icons";
import { Button, Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { ProductFragment_product$key } from "../graphql/Fragments/__generated__/ProductFragment_product.graphql";
import ProductFragment from "../graphql/Fragments/ProductFragment";

function ProductDetails(props: { product: ProductFragment_product$key }) {
  const product = useFragment<ProductFragment_product$key>(
    ProductFragment,
    props.product
  );

  return (
    <VStack
      alignItems={"center"}
      mr={{
        base: null,
        sm: null,
        md: null,
        lg: 10,
        xl: 20,
        "2xl": 20,
      }}
      space={5}
      w={{
        base: "95%",
        sm: "95%",
        md: "97%",
        lg: null,
        xl: null,
        "2xl": null,
      }}
    >
      <Text textAlign={"center"}>{product.brand.brand}</Text>
      <Text bold textAlign={"center"}>
        {product.description}
      </Text>
      <Text textAlign={"center"}>{product.price}</Text>
      <Text textAlign={"center"}>{product.stock}</Text>
      <Button
        colorScheme="amber"
        leftIcon={
          <MaterialIcons color="white" name="add-shopping-cart" size={20} />
        }
      >
        Agregar al Carrito
      </Button>
    </VStack>
  );
}

export default ProductDetails;
