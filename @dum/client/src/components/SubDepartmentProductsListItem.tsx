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
      alignContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
      h={"250"}
      w={"250"}
    >
      <Image
        alt={product.description}
        h={"100%"}
        source={{
          uri: `${product.pictureUrl}`,
        }}
        w={"100%"}
      />
      <Heading textAlign={"center"}>{product.brand}</Heading>
      <Text textAlign={"center"}>{product.description}</Text>
    </VStack>
  );
}

export default SubDepartmentProductsListItem;
