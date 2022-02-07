import { Stack } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import { SubDepartmentProductsFragment_products$key } from "../graphql/Fragments/__generated__/SubDepartmentProductsFragment_products.graphql";
import SubDepartmentProductsFragment from "../graphql/Fragments/SubDepartmentProductsFragment";
import SubDepartmentProductsListItem from "./SubDepartmentProductsListItem";

interface SubDepartmentProductsListProps {
  products: SubDepartmentProductsFragment_products$key;
}

function SubDepartmentProductsList(props: SubDepartmentProductsListProps) {
  const { data } = usePaginationFragment(
    SubDepartmentProductsFragment,
    props.products
  );

  return (
    <Stack mt={3} space={3}>
      {data.products.edges.map(({ node }) => (
        <SubDepartmentProductsListItem key={node.id} product={node} />
      ))}
    </Stack>
  );
}

export default SubDepartmentProductsList;
