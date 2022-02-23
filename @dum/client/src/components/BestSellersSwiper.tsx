import { Pressable, Text } from "native-base";
import * as React from "react";
import Swiper from "react-native-web-swiper";
import { useFragment } from "react-relay/hooks";

import { BestSellersFragment_bestSellers$key } from "../graphql/Fragments/__generated__/BestSellersFragment_bestSellers.graphql";
import BestSellersFragment from "../graphql/Fragments/BestSellersFragment";

interface BestSellerSwiperProps {
  bestSellers: BestSellersFragment_bestSellers$key;
}

import BestSellerSwiperItem from "./BestSellerSwiperItem";

function BestSellerSwiper(props: BestSellerSwiperProps) {
  const bestSellers = useFragment(BestSellersFragment, props.bestSellers);

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
        // @ts-expect-error
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
      {bestSellers.products.edges.map(({ node }) => (
        <BestSellerSwiperItem bestSeller={node} key={node.id} />
      ))}
    </Swiper>
  );
}

export default BestSellerSwiper;
