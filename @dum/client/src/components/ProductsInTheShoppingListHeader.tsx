import { Box, Text, VStack } from "native-base";
import * as React from "react";

import type { FreeShippingPercentageFragment_freeShippingPercentage$key } from "../graphql/Fragments/__generated__/FreeShippingPercentageFragment_freeShippingPercentage.graphql";
import type { MainDepartmentsFragment_mainDepartments$key } from "../graphql/Fragments/__generated__/MainDepartmentsFragment_mainDepartments.graphql";
import FreeShippingProgress from "./FreeShippingProgress";
import MainDepartmentsList from "./MainDepartmentsList";

interface ProductsInTheShoppingListHeaderProps {
  freeShippingPercentage: FreeShippingPercentageFragment_freeShippingPercentage$key;
  mainDepartments: MainDepartmentsFragment_mainDepartments$key;
}

function ProductsInTheShoppingListHeader(
  props: ProductsInTheShoppingListHeaderProps
) {
  return (
    <VStack>
      <MainDepartmentsList departments={props.mainDepartments} />
      <Box
        alignItems={"center"}
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
      >
        <FreeShippingProgress
          freeShippingPercentage={props.freeShippingPercentage}
        />
      </Box>
      <Text
        fontSize={{
          base: "md",
          sm: "md",
          md: "lg",
          lg: "xl",
          xl: "2xl",
          "2xl": "4xl",
        }}
        textAlign={"center"}
      >
        Los Productos en tu Carrito
      </Text>
    </VStack>
  );
}

export default ProductsInTheShoppingListHeader;
