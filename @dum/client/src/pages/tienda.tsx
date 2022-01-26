import { Text, VStack } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import BestSellerSwiper from "../components/BestSellersSwiper";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import MainDepartmentsList from "../components/MainDepartmentsList";
import type { StorePageQuery as StorePageQueryTypes } from "../graphql/Queries/__generated__/StorePageQuery.graphql";
import StorePageQuery from "../graphql/Queries/StorePageQuery";
import { getClientEnvironment } from "../lib/client";

function StorePage({ preloadedQuery }: RelayProps<{}, StorePageQueryTypes>) {
  const storePageQuery = usePreloadedQuery<StorePageQueryTypes>(
    StorePageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={storePageQuery.currentUser}>
      <VStack alignItems={"center"} flex={1} space={3} w={"100%"}>
        <MainDepartmentsList departments={storePageQuery} />
        <Text
          bold
          fontSize={{
            base: "2xl",
            sm: "2xl",
            md: "2xl",
            lg: "2xl",
            "2xl": "5xl",
          }}
        >
          ¡LO MÁS VENDIDO!
        </Text>
        <BestSellerSwiper bestSellers={storePageQuery} />
        <Text
          bold
          fontSize={{
            base: "xl",
            sm: "xl",
            md: "xl",
            lg: "xl",
            "2xl": "4xl",
          }}
          ml={3}
          mr={3}
          mt={5}
          textAlign={"center"}
        >
          ENCUENTRA LAS MEJORES OFERTAS EN NUESTRA TIENDA ONLINE
        </Text>
        <Text
          fontSize={{
            base: "xl",
            sm: "xl",
            md: "xl",
            lg: "xl",
            "2xl": "4xl",
          }}
          ml={3}
          mr={3}
          textAlign={"center"}
        >
          En nuestra Tienda Online encontrarás una amplia variedad de artículos
          para tu Hogar, Jardín, Plomería, Maquinaría Ligera y ¡mucho más!
        </Text>
        <Text
          bold
          fontSize={{
            base: "xl",
            sm: "xl",
            md: "xl",
            lg: "xl",
            "2xl": "4xl",
          }}
          ml={3}
          mr={3}
          mt={5}
          textAlign={"center"}
        >
          NO TE PIERDAS NUESTRAS PROMOCIONES
        </Text>
      </VStack>
    </Layout>
  );
}

export default withRelay(StorePage, StorePageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import("../lib/server/server");

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
