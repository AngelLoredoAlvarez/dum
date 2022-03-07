import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { mask } from "react-native-mask-text";
import { useFragment } from "react-relay/hooks";

import type { ProductInShoppingListItemFragment_productInShoppingList$key } from "../graphql/Fragments/__generated__/ProductInShoppingListItemFragment_productInShoppingList.graphql";
import ProductInShoppingListItemFragment from "../graphql/Fragments/ProductInShoppingListItemFragment";

interface ProductInShoppingListItemProps {
  productInShoppingList: ProductInShoppingListItemFragment_productInShoppingList$key;
}

function ProductInShoppingListItem(props: ProductInShoppingListItemProps) {
  const productInShoppingList =
    useFragment<ProductInShoppingListItemFragment_productInShoppingList$key>(
      ProductInShoppingListItemFragment,
      props.productInShoppingList
    );

  const [selectedQuantity, setSelectedQuantity] = React.useState<number>(
    productInShoppingList.quantity
  );

  const router = useRouter();

  const handleRouting = React.useCallback(() => {
    console.log("ROUTING");
    router.push(
      `/tienda/${productInShoppingList.product.subDepartment.department.mainDepartment
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "-")
        .toLowerCase()}/${productInShoppingList.product.subDepartment.subDepartment
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "-")
        .toLowerCase()}/${productInShoppingList.product.rowId}`
    );
  }, [
    productInShoppingList.product.rowId,
    productInShoppingList.product.subDepartment.department.mainDepartment,
    productInShoppingList.product.subDepartment.subDepartment,
    router,
  ]);

  const handleIncrease = () => {
    if (selectedQuantity == productInShoppingList.product.stock) {
      setSelectedQuantity(selectedQuantity);
    } else {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const handleChange = (val: string) => {
    const maskedStockValue: string = mask(val, "9999999");
    const stockValue: number = Number.parseInt(maskedStockValue);

    if (Number.isNaN(stockValue)) {
      setSelectedQuantity(1);
    } else if (stockValue > productInShoppingList.product.stock) {
      setSelectedQuantity(productInShoppingList.product.stock);
    } else {
      setSelectedQuantity(stockValue);
    }
  };

  const handleDecrease = () => {
    if (selectedQuantity == 1) {
      setSelectedQuantity(1);
    } else {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  return (
    <Stack
      _dark={{ backgroundColor: "gray.700" }}
      _light={{ backgroundColor: "coolGray.50" }}
      alignContent={"center"}
      direction={{
        base: "column",
        sm: "column",
        md: "row",
        lg: "row",
        xl: "row",
        "2xl": "row",
      }}
      mb="2"
      ml={{
        base: 5,
        sm: 5,
        md: 50,
        lg: 100,
        xl: 200,
        "2xl": 250,
      }}
      mr={{
        base: 5,
        sm: 5,
        md: 50,
        lg: 100,
        xl: 200,
        "2xl": 250,
      }}
      mt="2"
      overflow="hidden"
      rounded="lg"
      shadow="1"
    >
      <Box>
        <Image
          alt="image"
          h={{
            base: "40",
            sm: "215px",
            md: "215px",
            lg: "215px",
            xl: "215px",
            "2xl": "215px",
          }}
          w={{
            base: "100%",
            sm: "100%",
            md: "250px",
            lg: "250px",
            xl: "250px",
            "2xl": "250px",
          }}
          source={{
            uri: `${productInShoppingList.product.productPictures.edges[0].node.pictureUrl}`,
          }}
        />
      </Box>
      <Stack
        alignContent={"center"}
        alignItems={"center"}
        direction={{
          base: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
          "2xl": "row",
        }}
        flex={1}
        justifyContent={"center"}
        space={5}
      >
        <Text
          flex={1}
          fontSize={{
            base: "sm",
            sm: "sm",
            md: "sm",
            lg: "md",
            xl: "lg",
            "2xl": "xl",
          }}
          onPress={handleRouting}
          textAlign={"center"}
        >
          {productInShoppingList.product.description}
        </Text>
        <VStack alignItems={"center"}>
          <Input
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
              "2xl": "sm",
            }}
            value={selectedQuantity.toString()}
          />
          <HStack>
            <Text
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
              Disponibles:{" "}
            </Text>
            <Text
              bold
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
              {productInShoppingList.product.stock - selectedQuantity}
            </Text>
          </HStack>
        </VStack>
        <Text
          fontSize={{
            base: "sm",
            sm: "sm",
            md: "sm",
            lg: "md",
            xl: "lg",
            "2xl": "xl",
          }}
        >
          {productInShoppingList.cost}
        </Text>
        <Button
          colorScheme="red"
          mr={3}
          rightIcon={
            <MaterialCommunityIcons color="white" name="trash-can" size={20} />
          }
        >
          Eliminar del Carrito
        </Button>
      </Stack>
    </Stack>
  );
}

export default ProductInShoppingListItem;
