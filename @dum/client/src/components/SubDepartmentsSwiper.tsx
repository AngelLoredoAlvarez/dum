import { Box } from "native-base";
import * as React from "react";
import Swiper from "react-native-web-swiper";
import { usePaginationFragment } from "react-relay/hooks";

import { SubDepartmentsFragment_subDepartments$key } from "../graphql/Fragments/__generated__/SubDepartmentsFragment_subDepartments.graphql";
import SubDepartmentsFragment from "../graphql/Fragments/SubDepartmentsFragment";
import SubDepartmentItem from "./SubDepartmentItem";

interface SubDepartmentsSwiperProps {
  subDepartments: SubDepartmentsFragment_subDepartments$key;
}

function SubDepartmentsSwiper(props: SubDepartmentsSwiperProps) {
  const { data } = usePaginationFragment(
    SubDepartmentsFragment,
    props.subDepartments
  );

  console.log(data);

  return (
    <Box h={"450"} w={"100%"}>
      <Box
        flex={1}
        ml={{
          base: 3,
          sm: 3,
          md: 3,
          lg: 20,
          xl: 40,
          "2xl": 56,
        }}
        mr={{
          base: 3,
          sm: 3,
          md: 3,
          lg: 20,
          xl: 40,
          "2xl": 56,
        }}
      >
        <Swiper
          controlsProps={{
            dotsTouchable: true,
            dotActiveStyle: { backgroundColor: "#fbbf24" },
            prevPos: false,
            nextPos: false,
          }}
          from={0}
          loop
          timeout={10}
        >
          {data.subDepartmentsByDepartmentId.edges.map(({ node }) => (
            <SubDepartmentItem key={node.id} subDepartment={node} />
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default SubDepartmentsSwiper;
