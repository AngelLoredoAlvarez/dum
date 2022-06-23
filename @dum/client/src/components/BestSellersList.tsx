import { FlatList, Text } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import type { BestSellersFragment_bestSellers$key } from "../graphql/Fragments/__generated__/BestSellersFragment_bestSellers.graphql";
import BestSellersFragment from "../graphql/Fragments/BestSellersFragment";
import BestSellerListItem from "./BestSellerListItem";
import Loading from "./Loading";

interface BestSellersListProps {
  amountOfItemsToFetch: number;
  bestSellers: BestSellersFragment_bestSellers$key;
  numberOfColumns: number;
}

function BestSellersList(props: BestSellersListProps) {
  const { data, isLoadingNext, hasNext, loadNext } = usePaginationFragment(
    BestSellersFragment,
    props.bestSellers
  );

  return (
    <FlatList
      data={data.products.edges}
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
        <Text
          fontSize={{
            base: "md",
            sm: "lg",
            md: "xl",
            lg: "2xl",
            xl: "3xl",
            "2xl": "4xl",
          }}
          mb={3}
          mt={3}
          textAlign={"center"}
        >
          Mira, estos Productos podrian interesarte
        </Text>
      }
      keyExtractor={(item) => item.node.id}
      numColumns={props.numberOfColumns}
      onEndReached={() => {
        loadNext(props.amountOfItemsToFetch);
      }}
      onEndReachedThreshold={0}
      renderItem={({ item }) => <BestSellerListItem bestSeller={item.node} />}
    />
  );
}

export default BestSellersList;
