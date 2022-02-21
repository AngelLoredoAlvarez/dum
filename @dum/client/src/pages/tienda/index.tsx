import { Box, ScrollView, Text, VStack } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import BestSellerSwiper from "../../components/BestSellerSwiper";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import MainDepartmentsList from "../../components/MainDepartmentsList";
import type { StorePageQuery as StorePageQueryTypes } from "../../graphql/Queries/__generated__/StorePageQuery.graphql";
import StorePageQuery from "../../graphql/Queries/StorePageQuery";
import { getClientEnvironment } from "../../lib/client";

function StorePage({ preloadedQuery }: RelayProps<{}, StorePageQueryTypes>) {
  const storePageQuery = usePreloadedQuery<StorePageQueryTypes>(
    StorePageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={storePageQuery.currentUser}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <VStack alignItems={"center"} flex={1} space={3} w={"100%"}>
          <MainDepartmentsList departments={storePageQuery} />
          <Text
            bold
            fontSize={{
              base: "lg",
              sm: "lg",
              md: "xl",
              lg: "2xl",
              xl: "4xl",
              "2xl": "5xl",
            }}
          >
            ¡LO MÁS VENDIDO!
          </Text>
          <Box
            h={{
              base: "30%",
              sm: "30%",
              md: "35%",
              lg: "30%",
              xl: "35%",
              "2xl": "30%",
            }}
            w={{
              base: "95%",
              sm: "95%",
              md: "95%",
              lg: "85%",
              xl: "75%",
              "2xl": "65%",
            }}
          >
            <BestSellerSwiper bestSellers={storePageQuery} />
          </Box>
          <Text
            bold
            fontSize={{
              base: "lg",
              sm: "lg",
              md: "xl",
              lg: "2xl",
              xl: "4xl",
              "2xl": "5xl",
            }}
            mt={8}
            textAlign={"center"}
          >
            ¡ENCUENTRA LAS MEJORES OFERTAS EN NUESTRA TIENDA ONLINE!
          </Text>
          <Text
            fontSize={{
              base: "lg",
              sm: "lg",
              md: "xl",
              lg: "2xl",
              xl: "4xl",
              "2xl": "5xl",
            }}
            textAlign={"center"}
          >
            En nuestra Tienda Online encontrarás una amplia variedad de
            artículos para el Hogar, Jardín, de Plomería,Maquinaria Ligera ¡y
            mucho más!
          </Text>
          <Text
            bold
            fontSize={{
              base: "lg",
              sm: "lg",
              md: "xl",
              lg: "2xl",
              xl: "4xl",
              "2xl": "5xl",
            }}
            mt={8}
            textAlign={"center"}
          >
            ¡NO TE PIERDAS ESTAS PROMOCIONES!
          </Text>
          <Box
            h={{
              base: "30%",
              sm: "30%",
              md: "35%",
              lg: "30%",
              xl: "35%",
              "2xl": "30%",
            }}
            w={{
              base: "95%",
              sm: "95%",
              md: "95%",
              lg: "85%",
              xl: "75%",
              "2xl": "65%",
            }}
          >
            <BestSellerSwiper bestSellers={storePageQuery} />
          </Box>
        </VStack>
      </ScrollView>
    </Layout>
  );
}

export default withRelay(StorePage, StorePageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import("../../lib/server/server");

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
