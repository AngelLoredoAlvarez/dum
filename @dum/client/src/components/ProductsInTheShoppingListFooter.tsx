import { Box, Button, Divider, HStack, Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { CurrentUserAddressesFragment_addresses$key } from "../graphql/Fragments/__generated__/CurrentUserAddressesFragment_addresses.graphql";
import type { ProductsInTheShoppingListFooterFragment_costs$key } from "../graphql/Fragments/__generated__/ProductsInTheShoppingListFooterFragment_costs.graphql";
import ProductsInTheShoppingListFooterFragment from "../graphql/Fragments/ProductsInTheShoppingListFooterFragment";
import CurrentUserAddressesSelect from "./CurrentUserAddressesSelect";

interface ProductsInTheSHoppingListFooterProps {
  addresses: CurrentUserAddressesFragment_addresses$key;
  costs: ProductsInTheShoppingListFooterFragment_costs$key;
}

function ProductsInTheShoppingListFooter(
  props: ProductsInTheSHoppingListFooterProps
) {
  const costs = useFragment<ProductsInTheShoppingListFooterFragment_costs$key>(
    ProductsInTheShoppingListFooterFragment,
    props.costs
  );

  return (
    <VStack>
      {costs.amountToReachFreeShipping !== null && costs.totalToPay !== null ? (
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
            <CurrentUserAddressesSelect addresses={props.addresses} />
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
              {costs.amountToReachFreeShipping === "0.00"
                ? "¡Envío Gratis!"
                : `Costo de Envío $${costs.amountToReachFreeShipping}`}
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
              {costs.totalToPay}
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
      ) : (
        <Box
          _dark={{ backgroundColor: "gray.700" }}
          _light={{ backgroundColor: "coolGray.50" }}
          mb="2"
          ml={{
            base: "3",
            sm: "3",
            md: "12",
            lg: "20",
            xl: "16",
            "2xl": "40",
          }}
          mr={{
            base: "3",
            sm: "3",
            md: "12",
            lg: "20",
            xl: "16",
            "2xl": "40",
          }}
          mt="2"
          overflow="hidden"
          rounded="lg"
          shadow="1"
        >
          <Text
            flex={1}
            fontSize={{
              base: "lg",
              sm: "lg",
              md: "xl",
              lg: "2xl",
              xl: "3xl",
              "2xl": "4xl",
            }}
            textAlign={"center"}
          >
            Actualmente, no cuentas con ningun producto en tu carrito 😪 pero...
            😏
          </Text>
        </Box>
      )}
      <Box>
        <Text>Aqui va la FlatList</Text>
      </Box>
    </VStack>
  );
}

export default ProductsInTheShoppingListFooter;
