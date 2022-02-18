import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Text, VStack } from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useFragment } from "react-relay/hooks";
import * as Yup from "yup";

import type { ProductFragment_product$key } from "../graphql/Fragments/__generated__/ProductFragment_product.graphql";
import ProductFragment from "../graphql/Fragments/ProductFragment";

const StockValidationSchema = Yup.object().shape({
  stock: Yup.number().positive().min(1),
});

function ProductDetails(props: { product: ProductFragment_product$key }) {
  const product = useFragment<ProductFragment_product$key>(
    ProductFragment,
    props.product
  );

  const { control, setValue } = useForm<{ stock: number }>({
    defaultValues: { stock: 1 },
    resolver: yupResolver(StockValidationSchema),
  });

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
      <Controller
        control={control}
        name={"stock"}
        render={({ field: { value } }) => (
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
                onPress={() =>
                  setValue("stock", value + 1, { shouldValidate: true })
                }
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
                onPress={() =>
                  setValue("stock", value - 1, {
                    shouldValidate: true,
                  })
                }
              >
                -
              </Button>
            }
            py="0"
            size={{
              base: "base",
              sm: "sm",
              md: "md",
              lg: "lg",
              xl: "xl",
              "2xl": "2xl",
            }}
            value={value.toString()}
            w={{
              base: "",
              sm: "50%",
              md: "33%",
              lg: "50%",
              xl: "50%",
              "2xl": "44%",
            }}
          />
        )}
      />
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
