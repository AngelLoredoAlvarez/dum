import { Alert, Center, HStack, Text, VStack } from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Redirect from "../components/Redirect";
import type { VerifyPageQuery as VerifyPageQueryTypes } from "../graphql/Queries/__generated__/VerifyPageQuery.graphql";
import VerifyPageQuery from "../graphql/Queries/VerifyPageQuery";
import { getClientEnvironment } from "../lib/client";

function VerifyPage({ preloadedQuery }: RelayProps<{}, VerifyPageQueryTypes>) {
  const verifyPageQuery = usePreloadedQuery<VerifyPageQueryTypes>(
    VerifyPageQuery,
    preloadedQuery
  );

  const [verificated] = React.useState<boolean>(true);

  const router = useRouter();

  if (
    (router.query.id === null && router.query.token === null) ||
    (router.query.id === undefined && router.query.token === undefined)
  )
    return <Redirect href="/" />;

  return (
    <Layout currentUser={verifyPageQuery}>
      <Center flex={1}>
        <Alert
          colorScheme={verificated ? "success" : "error"}
          status={verificated ? "success" : "error"}
          w={{
            base: "90%",
            sm: "90%",
            md: "90%",
            lg: "80%",
            xl: "70%",
            "2xl": "60%",
          }}
        >
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              alignItems="center"
              flexShrink={1}
              justifyContent="space-between"
              space={2}
            >
              <HStack alignItems="center" flexShrink={1} space={2}>
                <Alert.Icon />
                <Text
                  color="coolGray.800"
                  fontSize={{
                    base: "sm",
                    sm: "md",
                    md: "lg",
                    lg: "xl",
                    xl: "2xl",
                    "2xl": "3xl",
                  }}
                  fontWeight="medium"
                >
                  {verificated
                    ? "¡Cuenta Verificada! 👏"
                    : "Error al Verificar la Cuenta 😵"}
                </Text>
              </HStack>
            </HStack>
            <Text
              color="gray.600"
              fontSize={{
                base: "md",
                sm: "lg",
                md: "xl",
                lg: "2xl",
                xl: "3xl",
                "2xl": "4xl",
              }}
              textAlign={"justify"}
            >
              {verificated
                ? "Gracias por verificar tu cuenta, puedes cerrar esta pestaña. 👌"
                : "No fue posible Verificar tu Cuenta 😔, intentalo nuevamente o ponte en contacto con Soporte Técnico 👍🏻."}
            </Text>
          </VStack>
        </Alert>
      </Center>
    </Layout>
  );
}

export default withRelay(VerifyPage, VerifyPageQuery, {
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
