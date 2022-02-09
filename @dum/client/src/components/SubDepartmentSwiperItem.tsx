import { Image, Pressable, Text, View, VStack } from "native-base";
import { useRouter } from "next/router";
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
  const router = useRouter();
  const { mainDepartment } = router.query;

  return (
    <View h={"100%"} w={"100%"}>
      {props.isActive ? (
        <Pressable
          h={"100%"}
          onPress={() =>
            router.push(
              `/tienda/${mainDepartment}/${subDepartment.subDepartment
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s/g, "-")
                .toLowerCase()}`
            )
          }
          w={"100%"}
        >
          <VStack h={"100%"} w={"100%"}>
            <Image
              alt={subDepartment.subDepartment}
              flex={1}
              source={{
                uri: `${subDepartment.pictureUrl}`,
              }}
              w={"100%"}
            />
            <Text
              fontSize={{
                base: "sm",
                sm: "sm",
                md: "md",
                lg: "lg",
                xl: "xl",
                "2xl": "2xl",
              }}
              mb={6}
              textAlign={"center"}
            >
              {subDepartment.subDepartment}
            </Text>
          </VStack>
        </Pressable>
      ) : null}
    </View>
  );
}

export default SubDepartmentSwiperItem;
