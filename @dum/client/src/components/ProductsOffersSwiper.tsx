import { Box } from "native-base";
import * as React from "react";
import Swiper from "react-native-web-swiper";

function ProductsOffersSwiper() {
  return (
    <Box h={"450"} w={"100%"}>
      <Box
        flex={1}
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
      >
        <Swiper
          controlsProps={{
            dotsTouchable: true,
            dotActiveStyle: { backgroundColor: "#fbbf24" },
            prevPos: false,
            nextPos: false,
          }}
          from={1}
          loop
          timeout={10}
        >
          <Box>Swipe 1</Box>
          <Box>Swip 2</Box>
          <Box>Swip 3</Box>
        </Swiper>
      </Box>
    </Box>
  );
}

export default ProductsOffersSwiper;
