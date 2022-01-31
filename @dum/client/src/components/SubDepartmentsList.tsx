import { HStack } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import { SubDepartmentsFragment_subDepartments$key } from "../graphql/Fragments/__generated__/SubDepartmentsFragment_subDepartments.graphql";
import SubDepartmentsFragment from "../graphql/Fragments/SubDepartmentsFragment";
import SubDepartmentItem from "./SubDepartmentItem";

interface SubDepartmentsListProps {
  subDepartments: SubDepartmentsFragment_subDepartments$key;
}

function SubDepartmentsList(props: SubDepartmentsListProps) {
  const { data } = usePaginationFragment(
    SubDepartmentsFragment,
    props.subDepartments
  );

  return (
    <HStack
      alignContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
      h={"100%"}
      space={5}
      w={"100%"}
    >
      {data.subDepartmentsByDepartmentId.edges.map(({ node }) => (
        <SubDepartmentItem key={node.rowId} subDepartment={node} />
      ))}
    </HStack>
  );
}

export default SubDepartmentsList;
