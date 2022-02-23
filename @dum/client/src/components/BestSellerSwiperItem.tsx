import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  View,
  VStack,
} from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { BestSellerFragment_bestSeller$key } from "../graphql/Fragments/__generated__/BestSellerFragment_bestSeller.graphql";
import BestSellerFragment from "../graphql/Fragments/BestSellerFragment";

interface BestSellerSwiperItemProps {
  activeIndex?: number;
  bestSeller: BestSellerFragment_bestSeller$key;
  index?: number;
  isActive?: boolean;
}

function BestSellerSwiperItem(props: BestSellerSwiperItemProps) {
  const bestSeller = useFragment(BestSellerFragment, props.bestSeller);

  return (
    <View h={"100%"} w={"100%"}>
      {props.isActive ? (
        <HStack
          _dark={{ backgroundColor: "gray.700" }}
          _light={{ backgroundColor: "coolGray.50" }}
          h={"100%"}
        >
          <Image
            alt={bestSeller.description}
            h={"100%"}
            source={{
              uri: `${bestSeller.productPictures.edges[0].node.pictureUrl}`,
            }}
            w={"50%"}
          />
          <VStack
            alignContent={"center"}
            alignItems={"center"}
            alignSelf={"center"}
            flex={1}
            space={8}
          >
            <Text
              bold
              fontSize={{
                base: 12,
                sm: 12,
                md: "sm",
                lg: "md",
                xl: "lg",
                "2xl": "xl",
              }}
              textAlign={"center"}
            >
              {bestSeller.brand.brand}
            </Text>
            <Text
              fontSize={{
                base: "md",
                sm: "md",
                md: "lg",
                lg: "xl",
                xl: "2xl",
                "2xl": "3xl",
              }}
              textAlign={"center"}
            >
              {bestSeller.description}
            </Text>
            <Box
              _dark={{
                backgroundColor: "gray.800",
              }}
              _light={{
                backgroundColor: "red.600",
              }}
              _text={{}}
            >
              <Text
                color={"white"}
                bold
                fontSize={{
                  base: "xl",
                  sm: "xl",
                  md: "2xl",
                  lg: "3xl",
                  xl: "4xl",
                  "2xl": "5xl",
                }}
              >
                {bestSeller.price} MXN
              </Text>
            </Box>
            <Button
              colorScheme="amber"
              endIcon={
                <Icon as={MaterialIcons} name="add-shopping-cart" size="sm" />
              }
              fontSize={"lg"}
            >
              Agregar al Carrito
            </Button>
          </VStack>
        </HStack>
      ) : null}
    </View>
  );
}

export default BestSellerSwiperItem;
