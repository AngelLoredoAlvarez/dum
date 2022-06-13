import { MaterialIcons } from "@expo/vector-icons";
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

import type { FreeShippingPercentageFragment_freeShippingPercentage$key } from "../graphql/Fragments/__generated__/FreeShippingPercentageFragment_freeShippingPercentage.graphql";
import type { LastAddedProductInTheShoppingListFragment_lastAddedProduct$key } from "../graphql/Fragments/__generated__/LastAddedProductInTheShoppingListFragment_lastAddedProduct.graphql";
import LastAddedProductInTheShoppingListFragment from "../graphql/Fragments/LastAddedProductInTheShoppingListFragment";
import FreeShippingProgress from "./FreeShippingProgress";

interface LastAddedProductInTheShoppingListProps {
  freeShippingPercentage: FreeShippingPercentageFragment_freeShippingPercentage$key;
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
      {lastAddedProductInTheShoppingList !== null ? (
        <>
          <Box>
            <Image
              alt="image"
              h={{
                base: "40",
                sm: "40",
                md: "100%",
                lg: "100%",
                xl: "215px",
                "2xl": "215px",
              }}
              w={{
                base: "100%",
                sm: "100%",
                md: "300px",
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
              md: "column",
              lg: "column",
              xl: "row",
              "2xl": "row",
            }}
            flex={1}
            p="4"
            space={[3, 3, 1.5]}
          >
            <VStack
              alignContent={"center"}
              alignItems={"center"}
              flex={1}
              space={2}
            >
              <Heading
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
                El Ultimo Producto que agregaste a tu Carrito fue:
              </Heading>
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
                {lastAddedProductInTheShoppingList.product.description}
              </Text>
              <HStack>
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
                  Cantidad:{" "}
                </Text>
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
                  {lastAddedProductInTheShoppingList.quantity}
                </Text>
              </HStack>
              <HStack>
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
                  Costo:{" "}
                </Text>
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
                  {lastAddedProductInTheShoppingList.cost}
                </Text>
              </HStack>
            </VStack>
            {screenSize === "base" ||
            screenSize === "sm" ||
            screenSize === "md" ||
            screenSize === "lg" ? (
              <Divider my={5} orientation={"horizontal"} />
            ) : (
              <Divider my={5} orientation={"vertical"} />
            )}
            <FreeShippingProgress
              freeShippingPercentage={props.freeShippingPercentage}
            />
            {screenSize === "base" ||
            screenSize === "sm" ||
            screenSize === "md" ||
            screenSize === "lg" ? (
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
                lg: "row",
                xl: "column",
                "2xl": "column",
              }}
              space={1}
            >
              <Button
                colorScheme={"amber"}
                leftIcon={<MaterialIcons color={"white"} name={"search"} />}
                onPress={handleRouting}
              >
                Ver Carrito
              </Button>
              <Button
                colorScheme={"amber"}
                leftIcon={<MaterialIcons color={"white"} name={"payment"} />}
              >
                Comprar Carrito
              </Button>
            </Stack>
          </Stack>
        </>
      ) : (
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
      )}
    </Stack>
  );
}

export default LastAddedProductInTheShoppingList;
