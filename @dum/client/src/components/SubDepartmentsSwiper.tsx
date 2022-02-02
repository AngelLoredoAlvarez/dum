import { Pressable, Text } from "native-base";
import * as React from "react";
import Swiper from "react-native-web-swiper";
import { useFragment } from "react-relay/hooks";

import { SubDepartmentsFragment_subDepartments$key } from "../graphql/Fragments/__generated__/SubDepartmentsFragment_subDepartments.graphql";
import SubDepartmentsFragment from "../graphql/Fragments/SubDepartmentsFragment";
import SubDepartmentSwiperItem from "./SubDepartmentSwiperItem";

interface SubDepartmentsSwiperProps {
  subDepartments: SubDepartmentsFragment_subDepartments$key;
}

function SubDepartmentsSwiper(props: SubDepartmentsSwiperProps) {
  const subDepartments = useFragment(
    SubDepartmentsFragment,
    props.subDepartments
  );

  return (
    <Swiper
      controlsProps={{
        dotActiveStyle: { backgroundColor: "#f59e0b" },
        dotsTouchable: true,
        nextPos: "right",
        prevPos: "left",
        //prevTitle: "",
        nextTitle: ">",
        nextTitleStyle: { color: "black", fontSize: 24, fontWeight: "500" },
        PrevComponent: ({ onPress }) => (
          <Pressable onPress={onPress}>
            <Text
              _dark={{
                color: "black",
              }}
              _light={{
                color: "black",
              }}
              fontSize={24}
              fontWeight={500}
            >
              {"<"}
            </Text>
          </Pressable>
        ),
      }}
      loop
      timeout={5}
    >
      {subDepartments.subDepartmentsByDepartmentId.edges.map(({ node }) => (
        <SubDepartmentSwiperItem key={node.id} subDepartment={node} />
      ))}
    </Swiper>
  );
}

export default SubDepartmentsSwiper;
