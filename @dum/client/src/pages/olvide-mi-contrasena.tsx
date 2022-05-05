import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Input,
  Link,
  Text,
  VStack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Alert from "../components/Alert";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import type { ForgotPasswordQuery as ForgotPasswordPageQueryTypes } from "../graphql/Queries/__generated__/ForgotPasswordQuery.graphql";
import ForgotPasswordQuery from "../graphql/Queries/ForgotPasswordQuery";
import { getClientEnvironment } from "../lib/client";

function ForgotPasswordPage({
  preloadedQuery,
}: RelayProps<{}, ForgotPasswordPageQueryTypes>) {
  const forgotPasswordPageQuery =
    usePreloadedQuery<ForgotPasswordPageQueryTypes>(
      ForgotPasswordQuery,
      preloadedQuery
    );

  const router = useRouter();

  const goToLogin = React.useCallback(() => {
    router.push("/login");
  }, [router]);

  const [emailSent] = React.useState<string>("");

  return (
    <Layout currentUser={forgotPasswordPageQuery}>
      <Center flex={1}>
        {emailSent.includes("SUCCESS") ? (
          <Alert
            message="Hemos enviado un Correo Electrónico con un Link para resetear tu contraseña, solo sigue las instrucciones, pero si no recibiste el Link, verifica que tecleaste tu Correo Electrónico correctamente, y revisa tu bandeja de Spam, solo por si acaso 🤔."
            status="success"
            title="¡Has recibido un Correo Electrónico 😀!"
          />
        ) : emailSent.includes("ERROR") ? (
          <Alert
            message="No pudimos enviarte el Link de reseteo 😔, intentalo nuevamente o ponte en contacto con Soporte Técnico 👍🏻."
            status="error"
            title="No fue posible enviarte el Link 😵"
          />
        ) : (
          <VStack
            alignItems={"center"}
            space={5}
            w={{
              base: "90%",
              sm: "90%",
              md: "85%",
              lg: "80%",
              xl: "75%",
              "2xl": "70%",
            }}
          >
            <Text
              bold
              fontSize={{
                base: "2xl",
                sm: "2xl",
                md: "3xl",
                lg: "4xl",
                xl: "5xl",
                "2xl": "5xl",
              }}
            >
              Olvide mi Contraseña 🙃
            </Text>
            <VStack space={5} w={"100%"}>
              <Input
                _focus={{
                  borderColor: "yellow.400",
                }}
                autoFocus={true}
                InputLeftElement={
                  <Icon
                    as={<MaterialCommunityIcons name="email" />}
                    size={5}
                    ml="2"
                    color="muted.400"
                  />
                }
                placeholder="Correo Electrónico"
                size={"md"}
              />
              <Button
                _text={{
                  fontSize: {
                    base: "md",
                    sm: "md",
                    md: "md",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "lg",
                  },
                }}
                colorScheme="amber"
                w={"40%"}
              >
                Resetear Contraseña
              </Button>
              <HStack w={"100%"}>
                <Link
                  _text={{
                    fontSize: {
                      base: "sm",
                      sm: "sm",
                      md: "md",
                      lg: "lg",
                      xl: "lg",
                      "2xl": "lg",
                    },
                    fontWeight: "500",
                    color: "amber.600",
                  }}
                  onPress={goToLogin}
                >
                  ¡Ya recorde mi contraseña! 🤩
                </Link>
                <Box flex={1} />
              </HStack>
            </VStack>
          </VStack>
        )}
      </Center>
    </Layout>
  );
}

export default withRelay(ForgotPasswordPage, ForgotPasswordQuery, {
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
