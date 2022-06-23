import { FlatList, Text } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { BestSellersFragment_bestSellers$key } from "../graphql/Fragments/__generated__/BestSellersFragment_bestSellers.graphql";
import BestSellersFragment from "../graphql/Fragments/BestSellersFragment";
import BestSellerListItem from "./BestSellerListItem";

interface BestSellersListProps {
  bestSellers: BestSellersFragment_bestSellers$key;
}

function BestSellersList(props: BestSellersListProps) {
  const { products } = useFragment<BestSellersFragment_bestSellers$key>(
    BestSellersFragment,
    props.bestSellers
  );

  return (
    <FlatList
      data={products.edges}
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
      renderItem={({ item }) => <BestSellerListItem bestSeller={item.node} />}
    />
  );
}

export default BestSellersList;
