import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { LastAddedProductInTheShoppingListFragment_lastAddedProduct$key } from "../graphql/Fragments/__generated__/LastAddedProductInTheShoppingListFragment_lastAddedProduct.graphql";
import LastAddedProductInTheShoppingListFragment from "../graphql/Fragments/LastAddedProductInTheShoppingListFragment";

interface LastAddedProductInTheShoppingListProps {
  lastAddedProductInTheShoppingList: LastAddedProductInTheShoppingListFragment_lastAddedProduct$key;
}

function LastAddedProductInTheShoppingList(
  props: LastAddedProductInTheShoppingListProps
) {
  const lastAddedProductInTheShoppingList =
    useFragment<LastAddedProductInTheShoppingListFragment_lastAddedProduct$key>(
      LastAddedProductInTheShoppingListFragment,
      props.lastAddedProductInTheShoppingList
    );

  const router = useRouter();

  const handleRouting = React.useCallback(() => {
    router.push("/carrito");
  }, [router]);

  const screenSize = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  return (
    <Stack
      _dark={{ backgroundColor: "gray.700" }}
      _light={{ backgroundColor: "coolGray.50" }}
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
        base: "3",
        sm: "3",
        md: "12",
        lg: "20",
        xl: "40",
        "2xl": "64",
      }}
      mr={{
        base: "3",
        sm: "3",
        md: "12",
        lg: "20",
        xl: "40",
        "2xl": "56",
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
            sm: "40",
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
            uri: `${lastAddedProductInTheShoppingList.product.productPictures.edges[0].node.pictureUrl}`,
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
        p="4"
        space={[3, 3, 1.5]}
      >
        <VStack alignContent={"center"} alignItems={"center"} space={2}>
          <Heading
            size={{
              base: "sm",
              sm: "sm",
              md: "sm",
              lg: "sm",
              xl: "sm",
              "2xl": "md",
            }}
            textAlign={"center"}
          >
            El Ultimo Producto que agregaste a tu Carrito fue:
          </Heading>
          <Text textAlign={"center"}>
            {lastAddedProductInTheShoppingList.product.description}
          </Text>
          <HStack>
            <Text bold textAlign={"center"}>
              Cantidad:{" "}
            </Text>
            <Text>{lastAddedProductInTheShoppingList.quantity}</Text>
          </HStack>
          <HStack>
            <Text bold textAlign={"center"}>
              Costo:{" "}
            </Text>
            <Text>{lastAddedProductInTheShoppingList.cost}</Text>
          </HStack>
        </VStack>
        {screenSize === "base" || screenSize === "sm" ? (
          <Divider my={5} orientation={"horizontal"} />
        ) : (
          <Divider my={5} orientation={"vertical"} />
        )}
        <VStack space={3}>
          <Heading
            size={{
              base: "sm",
              sm: "sm",
              md: "sm",
              lg: "sm",
              xl: "sm",
              "2xl": "md",
            }}
            textAlign={"center"}
          >
            ¡Alcanza el Envío Gratis comprando más productos!
          </Heading>
          <Text textAlign={"center"}>PROGRESS BAR</Text>
        </VStack>
        {screenSize === "base" || screenSize === "sm" ? (
          <Divider my={5} orientation={"horizontal"} />
        ) : (
          <Divider my={5} orientation={"vertical"} />
        )}
        <Stack
          alignContent={"center"}
          direction={{
            base: "row",
            sm: "row",
            md: "row",
            lg: "column",
            xl: "column",
            "2xl": "column",
          }}
          space={1}
        >
          <Button onPress={handleRouting}>Ver Carrito</Button>
          <Button>Comprar Carrito</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default LastAddedProductInTheShoppingList;
