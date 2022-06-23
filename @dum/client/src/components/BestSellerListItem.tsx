import { Heading, Image, Pressable, Text, VStack } from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { BestSellerFragment_bestSeller$key } from "../graphql/Fragments/__generated__/BestSellerFragment_bestSeller.graphql";
import BestSellerFragment from "../graphql/Fragments/BestSellerFragment";

interface BestSellerListItemProps {
  bestSeller: BestSellerFragment_bestSeller$key;
}

function BestSellerListItem(props: BestSellerListItemProps) {
  const bestSeller = useFragment<BestSellerFragment_bestSeller$key>(
    BestSellerFragment,
    props.bestSeller
  );

  const router = useRouter();

  const handleRouting = React.useCallback(() => {
    router.push(
      `/tienda/${bestSeller.subDepartment.department.mainDepartment
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "-")
        .toLowerCase()}/${bestSeller.subDepartment.subDepartment
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "-")
        .toLowerCase()}/${bestSeller.rowId}`
    );
  }, [
    bestSeller.rowId,
    bestSeller.subDepartment.department.mainDepartment,
    bestSeller.subDepartment.subDepartment,
    router,
  ]);

  return (
    <Pressable onPress={handleRouting}>
      {({ isHovered }) => (
        <VStack
          _dark={{ backgroundColor: "gray.700" }}
          _light={{ backgroundColor: "coolGray.50" }}
          alignContent={"center"}
          alignItems={"center"}
          alignSelf={"center"}
          h={"450"}
          mb={5}
          ml={{
            base: 4,
            sm: 4,
            md: 4,
            lg: 4,
            xl: 4,
            "2xl": 44,
          }}
          overflow="hidden"
          rounded="lg"
          shadow="9"
          style={{
            transform: [
              {
                scale: isHovered ? 1 : 0.96,
              },
            ],
          }}
          space={2}
          w={{
            base: "400",
            sm: "210",
            md: "220",
            lg: "230",
            xl: "240",
            "2xl": "250",
          }}
        >
          <Image
            alt={bestSeller.description}
            h={"70%"}
            source={{
              uri: `${bestSeller.productPictures.edges[0].node.pictureUrl}`,
            }}
            w={"100%"}
          />
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
            {bestSeller.brand.brand}
          </Heading>
          <Text fontSize={"sm"} textAlign={"center"}>
            {bestSeller.description}
          </Text>
          <Text bold fontSize={"sm"} textAlign={"center"}>
            {bestSeller.price}
          </Text>
        </VStack>
      )}
    </Pressable>
  );
}

export default BestSellerListItem;
