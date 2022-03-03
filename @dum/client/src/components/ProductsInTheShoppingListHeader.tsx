import { Text, VStack } from "native-base";
import * as React from "react";

import type { MainDepartmentsFragment_mainDepartments$key } from "../graphql/Fragments/__generated__/MainDepartmentsFragment_mainDepartments.graphql";
import MainDepartmentsList from "./MainDepartmentsList";

interface ProductsInTheShoppingListHeaderProps {
  mainDepartments: MainDepartmentsFragment_mainDepartments$key;
}

function ProductsInTheShoppingListHeader(
  props: ProductsInTheShoppingListHeaderProps
) {
  return (
    <VStack>
      <MainDepartmentsList departments={props.mainDepartments} />
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
