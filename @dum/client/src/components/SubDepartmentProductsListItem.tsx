import { Heading, Image, Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { ProductFragment_product$key } from "../graphql/Fragments/__generated__/ProductFragment_product.graphql";
import ProductFragment from "../graphql/Fragments/ProductFragment";

interface SubDepartmentProductsListItemProps {
  product: ProductFragment_product$key;
}

function SubDepartmentProductsListItem(
  props: SubDepartmentProductsListItemProps
) {
  const product = useFragment(ProductFragment, props.product);

  return (
    <VStack
      _dark={{ backgroundColor: "gray.700" }}
      _light={{ backgroundColor: "coolGray.50" }}
      alignContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
      h={"350"}
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
      w={{
        sm: "210",
        md: "220",
        lg: "230",
        xl: "240",
        "2xl": "250",
      }}
    >
      <Image
        alt={product.description}
        h={"70%"}
        source={{
          uri: `${product.pictureUrl}`,
        }}
        w={"100%"}
      />
      <Heading
        fontSize={{
          base: "sm",
          sm: "md",
          md: "lg",
          lg: "xl",
          xl: "2xl",
          "2xl": "3xl",
        }}
        textAlign={"center"}
      >
        {product.brand.brand}
      </Heading>
      <Text fontSize={"sm"} textAlign={"center"}>
        {product.description}
      </Text>
      <Text fontSize={"sm"} textAlign={"center"}>
        {product.price}
      </Text>
    </VStack>
  );
}

export default SubDepartmentProductsListItem;
