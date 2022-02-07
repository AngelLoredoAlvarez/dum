import { Image, Pressable, Text, VStack } from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { SubDepartmentFragment_subDepartment$key } from "../graphql/Fragments/__generated__/SubDepartmentFragment_subDepartment.graphql";
import SubDepartmentFragment from "../graphql/Fragments/SubDepartmentFragment";

interface SubDepartmentsListItemProps {
  subDepartment: SubDepartmentFragment_subDepartment$key;
}

function SubDepartmentsListItem(props: SubDepartmentsListItemProps) {
  const subDepartment = useFragment(SubDepartmentFragment, props.subDepartment);
  const router = useRouter();
  const { mainDepartment } = router.query;

  return (
    <Pressable
      onPress={() =>
        router.push(
          `/tienda/${mainDepartment}/${subDepartment.subDepartment
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s/g, "-")
            .toLowerCase()}`
        )
      }
    >
      {({ isHovered }) => (
        <VStack
          alignContent={"center"}
          alignItems={"center"}
          alignSelf={"center"}
          style={{
            transform: [
              {
                scale: isHovered ? 1 : 0.96,
              },
            ],
          }}
        >
          <Image
            alt={subDepartment.subDepartment}
            size={150}
            resizeMode={"contain"}
            borderRadius={100}
            source={{
              uri: `${subDepartment.pictureUrl}`,
            }}
          />
          <Text>{subDepartment.subDepartment}</Text>
        </VStack>
      )}
    </Pressable>
  );
}

export default SubDepartmentsListItem;
