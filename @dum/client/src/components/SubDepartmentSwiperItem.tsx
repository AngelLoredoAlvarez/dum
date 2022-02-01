import { Text, View, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { SubDepartmentFragment_subDepartment$key } from "../graphql/Fragments/__generated__/SubDepartmentFragment_subDepartment.graphql";
import SubDepartmentFragment from "../graphql/Fragments/SubDepartmentFragment";

interface SubDepartmentSwiperItemProps {
  activeIndex?: number;
  index?: number;
  isActive?: boolean;
  subDepartment: SubDepartmentFragment_subDepartment$key;
}

function SubDepartmentSwiperItem(props: SubDepartmentSwiperItemProps) {
  const subDepartment = useFragment(SubDepartmentFragment, props.subDepartment);

  return (
    <View h={"100%"} w={"100%"}>
      {props.isActive ? (
        <VStack>
          <Text>{subDepartment.subDepartment}</Text>
        </VStack>
      ) : null}
    </View>
  );
}

export default SubDepartmentSwiperItem;
