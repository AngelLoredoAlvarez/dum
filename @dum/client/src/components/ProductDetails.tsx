import { MaterialIcons } from "@expo/vector-icons";
import { Button, Input, Text, VStack } from "native-base";
import * as React from "react";
import { mask } from "react-native-mask-text";
import { useFragment } from "react-relay/hooks";

import type { ProductFragment_product$key } from "../graphql/Fragments/__generated__/ProductFragment_product.graphql";
import ProductFragment from "../graphql/Fragments/ProductFragment";

function ProductDetails(props: { product: ProductFragment_product$key }) {
  const product = useFragment<ProductFragment_product$key>(
    ProductFragment,
    props.product
  );

  const [stockValue, setStockValue] = React.useState<number>(1);

  const handleIncrease = () => {
    if (stockValue == product.stock) {
      setStockValue(stockValue);
    } else {
      setStockValue(stockValue + 1);
    }
  };

  const handleChange = (val: string) => {
    const maskedStockValue: string = mask(val, "9999999");
    const stockValue: number = Number.parseInt(maskedStockValue);

    if (Number.isNaN(stockValue)) {
      setStockValue(1);
    } else if (stockValue > product.stock) {
      setStockValue(product.stock);
    } else {
      setStockValue(stockValue);
    }
  };

  const handleDecrease = () => {
    if (stockValue == 1) {
      setStockValue(1);
    } else {
      setStockValue(stockValue - 1);
    }
  };

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
      <Text
        _dark={{
          bg: "gray.700",
        }}
        _light={{
          bg: "gray.200",
        }}
        fontSize={{
          base: "base",
          sm: "sm",
          md: "md",
          lg: "lg",
          xl: "xl",
          "2xl": "2xl",
        }}
        textAlign={"center"}
      >
        {product.brand.brand}
      </Text>
      <Text
        bold
        fontSize={{
          base: "base",
          sm: "sm",
          md: "md",
          lg: "lg",
          xl: "xl",
          "2xl": "2xl",
        }}
        textAlign={"center"}
      >
        {product.description}
      </Text>
      <Text
        fontSize={{
          base: "base",
          sm: "sm",
          md: "md",
          lg: "lg",
          xl: "xl",
          "2xl": "2xl",
        }}
        textAlign={"center"}
      >
        {product.price}
      </Text>
      <Text
        fontSize={{
          base: "base",
          sm: "sm",
          md: "sm",
          lg: "sm",
          xl: "md",
          "2xl": "lg",
        }}
        textAlign={"center"}
      >
        En existencia <Text bold>{product.stock}</Text> pzs.
      </Text>
      <Text
        fontSize={{
          base: "base",
          sm: "sm",
          md: "sm",
          lg: "sm",
          xl: "md",
          "2xl": "lg",
        }}
        textAlign={"center"}
      >
        INGRESA UNA CANTIDAD:
      </Text>
      <Input
        autoFocus
        _focus={{
          borderColor: "yellow.400",
        }}
        InputLeftElement={
          <Button
            colorScheme="amber"
            fontSize={{
              base: "base",
              sm: "sm",
              md: "md",
              lg: "lg",
              xl: "xl",
              "2xl": "2xl",
            }}
            onPress={handleIncrease}
          >
            +
          </Button>
        }
        InputRightElement={
          <Button
            colorScheme="amber"
            fontSize={{
              base: "base",
              sm: "sm",
              md: "md",
              lg: "lg",
              xl: "xl",
              "2xl": "2xl",
            }}
            onPress={handleDecrease}
          >
            -
          </Button>
        }
        onChangeText={(val: string) => handleChange(val)}
        py="0"
        size={{
          base: "base",
          sm: "sm",
          md: "md",
          lg: "lg",
          xl: "xl",
          "2xl": "2xl",
        }}
        value={stockValue.toString()}
        w={{
          base: "",
          sm: "50%",
          md: "33%",
          lg: "50%",
          xl: "50%",
          "2xl": "44%",
        }}
      />
      <Button
        colorScheme="amber"
        rightIcon={
          <MaterialIcons color="white" name="add-shopping-cart" size={20} />
        }
      >
        Agregar al Carrito
      </Button>
    </VStack>
  );
}

export default ProductDetails;
