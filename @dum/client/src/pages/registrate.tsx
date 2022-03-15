import { ScrollView, Text, VStack } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import RegisterForm from "../forms/RegisterForm";
import type { RegisterPageQuery as RegisterPageQueryTypes } from "../graphql/Queries/__generated__/RegisterPageQuery.graphql";
import RegisterPageQuery from "../graphql/Queries/RegisterPageQuery";
import { getClientEnvironment } from "../lib/client";

function RegisterPage({
  preloadedQuery,
}: RelayProps<{}, RegisterPageQueryTypes>) {
  const registerPageQuery = usePreloadedQuery<RegisterPageQueryTypes>(
    RegisterPageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={registerPageQuery}>
      <ScrollView
        contentContainerStyle={{
          alignContent: "center",
          flex: 1,
        }}
      >
        <VStack space={5}>
          <Text
            bold
            fontSize={{
              base: "lg",
              sm: "lg",
              md: "xl",
              lg: "2xl",
              xl: "3xl",
              "2xl": "4xl",
            }}
            textAlign={"center"}
          >
            ¡Registrate para acceder a todos nuestros Beneficios!
          </Text>
          <Text
            fontSize={{
              base: "md",
              sm: "md",
              md: "lg",
              lg: "xl",
              xl: "2xl",
              "2xl": "3xl",
            }}
            textAlign={"center"}
          >
            Todos los campos con{" "}
            <Text bold color={"red.500"}>
              *
            </Text>{" "}
            son OBLIGATORIOS
          </Text>
          <RegisterForm towns={registerPageQuery} />
        </VStack>
      </ScrollView>
    </Layout>
  );
}

export default withRelay(RegisterPage, RegisterPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import("../lib/server/server");

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies: string = ctx.req.headers.cookie;

    return { cookies };
  },
});
