import { Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { MainDepartmentsFragment_mainDepartments$key } from "../graphql/Fragments/__generated__/MainDepartmentsFragment_mainDepartments.graphql";
import { SubDepartmentFragment_subDepartment$key } from "../graphql/Fragments/__generated__/SubDepartmentFragment_subDepartment.graphql";
import SubDepartmentFragment from "../graphql/Fragments/SubDepartmentFragment";
import MainDepartmentsList from "./MainDepartmentsList";

interface SubDepartmentProductsListHeaderProps {
  mainDepartments: MainDepartmentsFragment_mainDepartments$key;
  subDepartment: SubDepartmentFragment_subDepartment$key;
}

function SubDepartmentProductsListHeader(
  props: SubDepartmentProductsListHeaderProps
) {
  const subDepartment = useFragment(SubDepartmentFragment, props.subDepartment);
  return (
    <VStack>
      <MainDepartmentsList departments={props.mainDepartments} />
      <VStack alignContent={"center"} alignItems={"center"} mb={5} space={3}>
        <Text
          bold
          fontSize={{
            base: "sm",
            sm: "sm",
            md: "md",
            lg: "lg",
            xl: "xl",
            "2xl": "5xl",
          }}
          textAlign={"center"}
        >
          {subDepartment.subDepartment}
        </Text>
        <Text
          fontSize={{
            base: "sm",
            sm: "sm",
            md: "md",
            lg: "lg",
            xl: "xl",
            "2xl": "2xl",
          }}
          textAlign={"center"}
        >
          {subDepartment.description}
        </Text>
      </VStack>
    </VStack>
  );
}

export default SubDepartmentProductsListHeader;
