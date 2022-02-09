import { FlatList, Text } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import { MainDepartmentsFragment_mainDepartments$key } from "../graphql/Fragments/__generated__/MainDepartmentsFragment_mainDepartments.graphql";
import { SubDepartmentFragment_subDepartment$key } from "../graphql/Fragments/__generated__/SubDepartmentFragment_subDepartment.graphql";
import { SubDepartmentProductsFragment_products$key } from "../graphql/Fragments/__generated__/SubDepartmentProductsFragment_products.graphql";
import SubDepartmentProductsFragment from "../graphql/Fragments/SubDepartmentProductsFragment";
import Loading from "./Loading";
import SubDepartmentProductsListHeader from "./SubDepartmentProductsListHeader";
import SubDepartmentProductsListItem from "./SubDepartmentProductsListItem";

interface SubDepartmentProductsListProps {
  amountOfItemsToFetch: number;
  mainDepartments: MainDepartmentsFragment_mainDepartments$key;
  numberOfColumns: number;
  products: SubDepartmentProductsFragment_products$key;
  subDepartment: SubDepartmentFragment_subDepartment$key;
}

function SubDepartmentProductsList(props: SubDepartmentProductsListProps) {
  const { data, isLoadingNext, hasNext, loadNext } = usePaginationFragment(
    SubDepartmentProductsFragment,
    props.products
  );

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: "center",
        flex: 1,
        flexGrow: 1,
      }}
      data={data.products.edges}
      flex={1}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponentStyle={{
        alignItems: "stretch",
        width: "100%",
      }}
      ListFooterComponent={
        hasNext ? (
          isLoadingNext ? (
            <Loading />
          ) : null
        ) : (
          <Text
            fontSize={{
              base: "sm",
              sm: "sm",
              md: "md",
              lg: "lg",
              xl: "xl",
              "2xl": "2xl",
            }}
            textAlign={"center"}
          >
            No hay nada más para mostrar
          </Text>
        )
      }
      ListHeaderComponent={
        <SubDepartmentProductsListHeader
          mainDepartments={props.mainDepartments}
          subDepartment={props.subDepartment}
        />
      }
      numColumns={props.numberOfColumns}
      onEndReached={() => {
        loadNext(props.amountOfItemsToFetch);
      }}
      onEndReachedThreshold={0}
      renderItem={({ item }) => (
        <SubDepartmentProductsListItem product={item.node} />
      )}
      w={"100%"}
    />
  );
}

export default SubDepartmentProductsList;
