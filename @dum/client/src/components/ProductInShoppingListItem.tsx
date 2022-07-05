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
import * as React from "react";
import { mask } from "react-native-mask-text";
import { useFragment, useMutation } from "react-relay/hooks";
import { ConnectionHandler, RecordSourceSelectorProxy } from "relay-runtime";

import type { ProductInShoppingListItemFragment_productInShoppingList$key } from "../graphql/Fragments/__generated__/ProductInShoppingListItemFragment_productInShoppingList.graphql";
import ProductInShoppingListItemFragment from "../graphql/Fragments/ProductInShoppingListItemFragment";
import type { DeleteFromShoppingListMutation as DeleteFromShoppingListMutationTypes } from "../graphql/Mutations/__generated__/DeleteFromShoppingListMutation.graphql";
import type { UpdateShoppingListDetailProductQuantityMutation as UpdateShoppingListDetailProductQuantityMutationTypes } from "../graphql/Mutations/__generated__/UpdateShoppingListDetailProductQuantityMutation.graphql";
import DeleteFromShoppingListMutation from "../graphql/Mutations/DeleteFromShoppingListMutation";
import UpdateShoppingListDetailProductQuantityMutation from "../graphql/Mutations/UpdateShoppingListDetailProductQuantityMutation";

interface ProductInShoppingListItemProps {
  currentUserID: string;
  productInShoppingList: ProductInShoppingListItemFragment_productInShoppingList$key;
  productsInTheShoppingListID: string;
}

function ProductInShoppingListItem(props: ProductInShoppingListItemProps) {
  const productInShoppingList =
    useFragment<ProductInShoppingListItemFragment_productInShoppingList$key>(
      ProductInShoppingListItemFragment,
      props.productInShoppingList
    );

  const [deleteFromShoppingList] =
    useMutation<DeleteFromShoppingListMutationTypes>(
      DeleteFromShoppingListMutation
    );

  const [selectedQuantity, setSelectedQuantity] = React.useState<number>(
    productInShoppingList?.quantity
  );

  const [updateShoppingListDetailProductQuantity, isInFlight] =
    useMutation<UpdateShoppingListDetailProductQuantityMutationTypes>(
      UpdateShoppingListDetailProductQuantityMutation
    );

  React.useEffect(() => {
    updateShoppingListDetailProductQuantity({
      onCompleted: () => {},
      onError: () => {},
      variables: {
        UpdateShoppingListDetailProductQuantityInput: {
          productId: productInShoppingList.product.rowId,
          quantity: selectedQuantity,
        },
      },
    });
  }, [
    productInShoppingList.product.rowId,
    props.currentUserID,
    selectedQuantity,
    updateShoppingListDetailProductQuantity,
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

  const handleDeleteFromShoppingList = () => {
    deleteFromShoppingList({
      onCompleted: () => {},
      onError: () => {},
      updater: (store: RecordSourceSelectorProxy) => {
        const connection = store.get(props.productsInTheShoppingListID);
        ConnectionHandler.deleteNode(connection, productInShoppingList.id);
      },
      variables: {
        DeleteFromShoppingListInput: {
          productId: `${productInShoppingList.product.rowId}`,
        },
      },
    });
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
            isDisabled={isInFlight}
            onChangeText={(val: string) => handleChange(val)}
            py="0"
            size={"md"}
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
          isDisabled={isInFlight}
          mr={3}
          rightIcon={
            <MaterialCommunityIcons color="white" name="trash-can" size={20} />
          }
          onPress={handleDeleteFromShoppingList}
        >
          Eliminar del Carrito
        </Button>
      </Stack>
    </Stack>
  );
}

export default ProductInShoppingListItem;
