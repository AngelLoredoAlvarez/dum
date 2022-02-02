import { HStack } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import { SubDepartmentsFragment_subDepartments$key } from "../graphql/Fragments/__generated__/SubDepartmentsFragment_subDepartments.graphql";
import SubDepartmentsFragment from "../graphql/Fragments/SubDepartmentsFragment";
import SubDepartmentsListItem from "./SubDepartmentListItem";

interface SubDepartmentsListProps {
  subDepartments: SubDepartmentsFragment_subDepartments$key;
}

function SubDepartmentsList(props: SubDepartmentsListProps) {
  const { data } = usePaginationFragment(
    SubDepartmentsFragment,
    props.subDepartments
  );

  return (
    <HStack space={8}>
      {data.subDepartmentsByDepartmentId.edges.map(({ node }) => (
        <SubDepartmentsListItem key={node.id} subDepartment={node} />
      ))}
    </HStack>
  );
}

export default SubDepartmentsList;
