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
    <Swiper>
      {subDepartments.subDepartmentsByDepartmentId.edges.map(({ node }) => (
        <SubDepartmentSwiperItem key={node.id} subDepartment={node} />
      ))}
    </Swiper>
  );
}

export default SubDepartmentsSwiper;
