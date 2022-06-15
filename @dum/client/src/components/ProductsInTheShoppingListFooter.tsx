import { Button, Divider, HStack, Select, Text, VStack } from "native-base";
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
        <Select placeholder={"Elige la dirección a donde enviaremos"}>
          <Select.Item label={"Direccion 1"} value={"Direccion 1"} />
          <Select.Item label={"Direccion 2"} value={"Direccion 2"} />
          <Select.Item label={"Direccion 3"} value={"Direccion 3"} />
          <Select.Item label={"Direccion 4"} value={"Direccion 4"} />
          <Select.Item label={"Direccion 5"} value={"Direccion 5"} />
        </Select>
        <Text bold>Costo de Envio</Text>
      </HStack>
      <HStack alignItems={"center"} justifyContent={"right"} space={3}>
        <Text>Total con Envío: </Text>
        <Text bold>$ 0.00</Text>
      </HStack>
      <Button
        colorScheme={"amber"}
        ml={{
          base: 230,
        }}
      >
        Continuar compra
      </Button>
      <Divider
        _dark={{
          bg: "white",
        }}
        _light={{
          bg: "coolGray.400",
        }}
        orientation={"horizontal"}
      />
    </VStack>
  );
}

export default ProductsInTheShoppingListFooter;
