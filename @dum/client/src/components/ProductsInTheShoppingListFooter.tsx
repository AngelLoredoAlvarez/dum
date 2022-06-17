import {
  Box,
  Button,
  Divider,
  HStack,
  Select,
  Text,
  VStack,
} from "native-base";
import * as React from "react";

function ProductsInTheShoppingListFooter() {
  return (
    <VStack
      mb={2}
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
      mt={2}
      space={3}
    >
      <Divider
        _dark={{
          bg: "white",
        }}
        _light={{
          bg: "coolGray.400",
        }}
        orientation={"horizontal"}
      />
      <HStack alignItems={"center"} justifyContent={"right"} space={3}>
        <Select
          size={{
            base: "sm",
            sm: "md",
            md: "lg",
            lg: "xl",
            xl: "2xl",
            "2xl": "2xl",
          }}
          placeholder={"Elige la dirección"}
        >
          <Select.Item
            label={`Enviar a C.P.: Dirección 1`}
            value={"Direccion1"}
          />
          <Select.Item
            label={"Enviar a C.P.: Dirección 2"}
            value={"Direccion2"}
          />
          <Select.Item
            label={"Enviar a C.P.: Dirección 3"}
            value={"Direccion3"}
          />
          <Select.Item
            label={"Enviar a C.P.: Dirección 4"}
            value={"Direccion4"}
          />
          <Select.Item
            label={"Enviar a C.P.: Dirección 5"}
            value={"Direccion5"}
          />
        </Select>
        <Text
          bold
          fontSize={{
            base: "sm",
            sm: "md",
            md: "lg",
            lg: "xl",
            xl: "2xl",
            "2xl": "2xl",
          }}
        >
          Costo de Envio
        </Text>
      </HStack>
      <HStack alignItems={"center"} justifyContent={"right"} space={3}>
        <Text
          fontSize={{
            base: "sm",
            sm: "md",
            md: "lg",
            lg: "xl",
            xl: "2xl",
            "2xl": "2xl",
          }}
        >
          Total con Envío:{" "}
        </Text>
        <Text
          bold
          fontSize={{
            base: "sm",
            sm: "md",
            md: "lg",
            lg: "xl",
            xl: "2xl",
            "2xl": "2xl",
          }}
        >
          $ 0.00
        </Text>
      </HStack>
      <Divider
        _dark={{
          bg: "white",
        }}
        _light={{
          bg: "coolGray.400",
        }}
        orientation={"horizontal"}
      />
      <Box flexDir={"row"}>
        <Box flex={1} />
        <Button colorScheme={"amber"}>Continuar compra</Button>
      </Box>
    </VStack>
  );
}

export default ProductsInTheShoppingListFooter;
