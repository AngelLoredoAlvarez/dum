import { Box } from "native-base";
import * as React from "react";
import Swiper from "react-native-web-swiper";
import { usePaginationFragment } from "react-relay/hooks";

import type { BestSellers as BestSellersTypes } from "../graphql/Fragments/__generated__/BestSellers.graphql";
import { BestSellersFragment_bestSellers$key } from "../graphql/Fragments/__generated__/BestSellersFragment_bestSellers.graphql";
import BestSellersFragment from "../graphql/Fragments/BestSellersFragment";
import ProductSwiperItem from "./ProductSwiperItem";

interface BestSellersProps {
  bestSellers: BestSellersFragment_bestSellers$key;
}

function BestSellerSwiper(props: BestSellersProps) {
  const { data } = usePaginationFragment<BestSellersTypes, _>(
    BestSellersFragment,
    props.bestSellers
  );

  return (
    <Box h={"55%"} w={"100%"}>
      <Box
        ml={{
          base: 3,
          sm: 3,
          md: 3,
          lg: 20,
          xl: 40,
          "2xl": 56,
        }}
        mr={{
          base: 3,
          sm: 3,
          md: 3,
          lg: 20,
          xl: 40,
          "2xl": 56,
        }}
        flex={1}
      >
        <Swiper
          controlsProps={{
            dotsTouchable: true,
            dotActiveStyle: { backgroundColor: "#fbbf24" },
            prevPos: false,
            nextPos: false,
          }}
          from={0}
          loop
          timeout={10}
        >
          {data.products.edges.map(({ node }) => (
            <Box
              alignContent={"center"}
              alignItems={"center"}
              flex={1}
              key={node.id}
            >
              <ProductSwiperItem product={node} />
            </Box>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default BestSellerSwiper;
