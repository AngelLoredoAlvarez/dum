import { MaterialIcons } from "@expo/vector-icons";
import { Button, Input, Text, VStack } from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { mask } from "react-native-mask-text";
import { useFragment, useMutation } from "react-relay/hooks";

import type { ProductFragment_product$key } from "../graphql/Fragments/__generated__/ProductFragment_product.graphql";
import ProductFragment from "../graphql/Fragments/ProductFragment";
import type { AddToShoppingListMutation as AddToShoppingListMutationTypes } from "../graphql/Mutations/__generated__/AddToShoppingListMutation.graphql";
import AddToShoppingListMutation from "../graphql/Mutations/AddToShoppingListMutation";

interface ProductDetailsProps {
  product: ProductFragment_product$key;
  isLoggedIn: boolean;
}

function ProductDetails(props: ProductDetailsProps) {
  const product = useFragment<ProductFragment_product$key>(
    ProductFragment,
    props.product
  );

  const [addToShoppingList] = useMutation<AddToShoppingListMutationTypes>(
    AddToShoppingListMutation
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

  const router = useRouter();

  const handleLoginRouting = React.useCallback(() => {
    if (props.isLoggedIn) {
      router.push("/carrito/ultimo-producto-agregado");
    } else {
      router.push(
        `/login?next=${encodeURIComponent(
          `/carrito/ultimo-producto-agregado`
        )}&product_id=${product.rowId}&quantity=${stockValue}`
      );
    }
  }, [product.rowId, props.isLoggedIn, router, stockValue]);

  const handleAddToShoppingList = () => {
    if (props.isLoggedIn) {
      addToShoppingList({
        onCompleted: (response) => {
          if (
            response.addToShoppingList.shoppingListDetail !== null &&
            response.addToShoppingList.shoppingListDetail !== undefined
          ) {
            handleLoginRouting();
          }
        },
        onError: () => {},
        variables: {
          AddToShoppingListInput: {
            productId: product.rowId,
            selectedQuantity: stockValue,
          },
        },
      });
    } else {
      handleLoginRouting();
    }
  };

  return (
    <VStack
      alignItems={"center"}
      flex={1}
      mr={{
        base: null,
        sm: null,
        md: null,
        lg: 10,
        xl: 20,
        "2xl": 20,
      }}
      space={5}
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
        En existencia <Text bold>{product.stock - stockValue}</Text> pzs.
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
        size={"md"}
        value={stockValue.toString()}
      />
      <Button
        colorScheme="amber"
        onPress={handleAddToShoppingList}
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
