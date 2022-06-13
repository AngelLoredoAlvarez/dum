import { Text, VStack } from "native-base";
import * as React from "react";

import { FreeShippingPercentageFragment_freeShippingPercentage$key } from "../graphql/Fragments/__generated__/FreeShippingPercentageFragment_freeShippingPercentage.graphql";
import type { LastAddedProductInTheShoppingListFragment_lastAddedProduct$key } from "../graphql/Fragments/__generated__/LastAddedProductInTheShoppingListFragment_lastAddedProduct.graphql";
import type { MainDepartmentsFragment_mainDepartments$key } from "../graphql/Fragments/__generated__/MainDepartmentsFragment_mainDepartments.graphql";
import LastAddedProductInTheShoppingList from "./LastAddedProductInTheShoppingList";
import MainDepartmentsList from "./MainDepartmentsList";

interface ProductsLikeTheLastAddedProductListHeaderProps {
  freeShippingPercentage: FreeShippingPercentageFragment_freeShippingPercentage$key;
  lastAddedProductInTheShoppingList: LastAddedProductInTheShoppingListFragment_lastAddedProduct$key;
  mainDepartments: MainDepartmentsFragment_mainDepartments$key;
}

function ProductsLikeTheLastAddedProductListHeader(
  props: ProductsLikeTheLastAddedProductListHeaderProps
) {
  return (
    <VStack>
      <MainDepartmentsList departments={props.mainDepartments} />
      <LastAddedProductInTheShoppingList
        freeShippingPercentage={props.freeShippingPercentage}
        lastAddedProductInTheShoppingList={
          props.lastAddedProductInTheShoppingList
        }
      />
      <Text
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
        Mira, estos Productos podrian interesarte
      </Text>
    </VStack>
  );
}

export default ProductsLikeTheLastAddedProductListHeader;
