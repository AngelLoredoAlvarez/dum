import { Box, Hidden, Text, VStack } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";
import MainDepartmentsList from "../../../components/MainDepartmentsList";
import SubDepartmentsList from "../../../components/SubDepartmentsList";
import SubDepartmentsSwiper from "../../../components/SubDepartmentsSwiper";
import type { MainDepartmentPageQuery as MainDepartmentPageQueryTypes } from "../../../graphql/Queries/__generated__/MainDepartmentPageQuery.graphql";
import MainDepartmentPageQuery from "../../../graphql/Queries/MainDepartmentPageQuery";
import { getClientEnvironment } from "../../../lib/client";

function MainDepartmentPage({
  preloadedQuery,
}: RelayProps<{}, MainDepartmentPageQueryTypes>) {
  const mainDepartmentPageQuery =
    usePreloadedQuery<MainDepartmentPageQueryTypes>(
      MainDepartmentPageQuery,
      preloadedQuery
    );

  return (
    <Layout currentUser={mainDepartmentPageQuery.currentUser}>
      <VStack alignItems={"center"} flex={1} space={3} w={"100%"}>
        <MainDepartmentsList departments={mainDepartmentPageQuery} />
        <Text
          fontSize={{
            base: "xl",
            sm: "xl",
            md: "2xl",
            lg: "3xl",
            xl: "4xl",
            "2xl": "5xl",
          }}
        >
          {mainDepartmentPageQuery.mainDepartmentByName.mainDepartment}
        </Text>
        <Hidden only={["base", "sm"]}>
          <SubDepartmentsList
            subDepartments={mainDepartmentPageQuery.mainDepartmentByName}
          />
        </Hidden>
        <Hidden only={["2xl", "xl", "lg", "md"]}>
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
            <SubDepartmentsSwiper
              subDepartments={mainDepartmentPageQuery.mainDepartmentByName}
            />
          </Box>
        </Hidden>
      </VStack>
    </Layout>
  );
}

export default withRelay(MainDepartmentPage, MainDepartmentPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import(
      "../../../lib/server/server"
    );

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
