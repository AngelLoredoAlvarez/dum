import { FlatList } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import { SubDepartmentProductsFragment_products$key } from "../graphql/Fragments/__generated__/SubDepartmentProductsFragment_products.graphql";
import SubDepartmentProductsFragment from "../graphql/Fragments/SubDepartmentProductsFragment";
import SubDepartmentProductsListItem from "./SubDepartmentProductsListItem";

interface SubDepartmentProductsListProps {
  products: SubDepartmentProductsFragment_products$key;
}

function SubDepartmentProductsList(props: SubDepartmentProductsListProps) {
  const { data, loadNext } = usePaginationFragment(
    SubDepartmentProductsFragment,
    props.products
  );

  return (
    <FlatList
      alignContent={"center"}
      alignSelf={"center"}
      borderWidth={1}
      data={data.products.edges}
      flexWrap={1}
      keyExtractor={(item) => item.node.id}
      numColumns={6}
      onEndReached={() => {
        loadNext(6);
      }}
      onEndReachedThreshold={0}
      renderItem={({ item }) => (
        <SubDepartmentProductsListItem product={item.node} />
      )}
    />
  );
}

export default SubDepartmentProductsList;
