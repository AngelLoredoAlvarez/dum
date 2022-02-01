import { Pressable, Text } from "native-base";
import * as React from "react";
import Swiper from "react-native-web-swiper";
import { usePaginationFragment } from "react-relay/hooks";

import { BestSellersFragment_bestSellers$key } from "../graphql/Fragments/__generated__/BestSellersFragment_bestSellers.graphql";
import BestSellersFragment from "../graphql/Fragments/BestSellersFragment";

interface BestSellerSwiperProps {
  bestSellers: BestSellersFragment_bestSellers$key;
}

import BestSellerSwiperItem from "./BestSellerSwiperItem";

function BestSellerSwiper(props: BestSellerSwiperProps) {
  const { data } = usePaginationFragment(
    BestSellersFragment,
    props.bestSellers
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
      {data.products.edges.map(({ node }) => (
        <BestSellerSwiperItem key={node.id} product={node} />
      ))}
    </Swiper>
  );
}

export default BestSellerSwiper;
