import { Box, Image, Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { SubDepartmentFragment_subDepartment$key } from "../graphql/Fragments/__generated__/SubDepartmentFragment_subDepartment.graphql";
import SubDepartmentFragment from "../graphql/Fragments/SubDepartmentFragment";

interface SubDepartmentItemProps {
  activeIndex?: number;
  index?: number;
  isActive?: boolean;
  subDepartment: SubDepartmentFragment_subDepartment$key;
}

function SubDepartmentItem(props: SubDepartmentItemProps) {
  const subDepartment = useFragment(SubDepartmentFragment, props.subDepartment);

  return (
    <Box>
      <VStack
        alignContent={"center"}
        alignItems={"center"}
        alignSelf={"center"}
      >
        <Image
          alt={subDepartment.subDepartment}
          size={150}
          source={{ uri: `${subDepartment.pictureUrl}` }}
        />
        <Text>{subDepartment.subDepartment}</Text>
      </VStack>
    </Box>
  );
}

export default SubDepartmentItem;
