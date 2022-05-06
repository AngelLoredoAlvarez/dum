import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Center,
  FormControl,
  Input,
  Stack,
  Text,
  VStack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";
import * as Yup from "yup";

import Alert from "../components/Alert";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import type { ResetPasswordMutation as ResetPasswordMutationTypes } from "../graphql/Mutations/__generated__/ResetPasswordMutation.graphql";
import ResetPasswordMutation from "../graphql/Mutations/ResetPasswordMutation";
import type { ResetPasswordPageQuery as ResetPasswordPageQueryTypes } from "../graphql/Queries/__generated__/ResetPasswordPageQuery.graphql";
import ResetPasswordPageQuery from "../graphql/Queries/ResetPasswordPageQuery";
import { getClientEnvironment } from "../lib/client";

interface ResetPasswordPageProps {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordValidationSchema = Yup.object().shape({
  token: Yup.string().required("Ingresa el Token de Reseteo"),
  newPassword: Yup.string()
    .required("Ingresa la Contraseña")
    .min(8, "Tu contraseña debe de ser igual o mayor a 8 digitos"),
  confirmPassword: Yup.string()
    .required("Confirma tu Contraseña")
    .oneOf([Yup.ref("newPassword")], "Tus contraseñas no concuerdan"),
});

function ResetPasswordPage({
  preloadedQuery,
}: RelayProps<{}, ResetPasswordPageQueryTypes>) {
  const resetPasswordPageQuery = usePreloadedQuery<ResetPasswordPageQueryTypes>(
    ResetPasswordPageQuery,
    preloadedQuery
  );

  const [resetPasswordState, setResetPasswordState] =
    React.useState<string>("");

  const router = useRouter();
  const { user_id = "", token = "" } = router.query;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordPageProps>({
    defaultValues: {
      token: token.toString(),
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(ResetPasswordValidationSchema),
  });

  const [resetPassword, resetPasswordIsInFlight] =
    useMutation<ResetPasswordMutationTypes>(ResetPasswordMutation);

  const onSubmit = ({ token, newPassword }) => {
    resetPassword({
      onCompleted: (response, apiErrors) => {
        if (response.resetPassword) {
          if (response.resetPassword.success) {
            setResetPasswordState("SUCCESS");
          }
        } else if (apiErrors[0].message !== "") {
          setResetPasswordState("ERROR");
        }
      },
      onError: (err) => {
        console.log(err);
      },
      variables: {
        ResetPasswordInput: {
          userId: user_id,
          resetToken: token,
          newPassword,
        },
      },
    });
  };

  return (
    <Layout currentUser={resetPasswordPageQuery}>
      <Center flex={1}>
        {resetPasswordIsInFlight ? (
          <Alert
            message="Estamos enviando la Información 🚀, esto puede tomar unos minutos ⏲️."
            status="info"
            title="Reseteando tú Contraseña ⌨️"
          />
        ) : resetPasswordState === "SUCCESS" ? (
          <Alert
            message="Tú contraseña ha sido Reseteada 👏, ahora puedes ir a iniciar sesión 🤗."
            status="success"
            title="Contraseña Reseteada ✅"
          />
        ) : resetPasswordState === "ERROR" ? (
          <Alert
            message="No fue posible Resetear tú Contraseña 😔, intentalo nuevamente o ponte en contacto con Soporte Técnico 👍🏻."
            status="error"
            title="Error al Resetear tú Contraseña 😵"
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
              Resetea tu Contraseña 👍🏻
            </Text>
            <VStack space={5} w={"100%"}>
              <FormControl isInvalid={errors.token?.message && true}>
                <Stack
                  direction={{
                    base: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                    xl: "row",
                    "2xl": "row",
                  }}
                  flex={1}
                >
                  <FormControl.Label>
                    <Text
                      bold
                      fontSize={{
                        base: "sm",
                        sm: "sm",
                        md: "sm",
                        lg: "md",
                        xl: "lg",
                        "2xl": "xl",
                      }}
                    >
                      <Text bold color={"red.500"}>
                        *{" "}
                      </Text>
                      Token de Reseteo:
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"token"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoFocus
                          onBlur={onBlur}
                          onChange={onChange}
                          size={"md"}
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage
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
                    >
                      {errors.token?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </Stack>
              </FormControl>
              <FormControl isInvalid={errors.newPassword?.message && true}>
                <Stack
                  direction={{
                    base: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                    xl: "row",
                    "2xl": "row",
                  }}
                  flex={1}
                >
                  <FormControl.Label>
                    <Text
                      bold
                      fontSize={{
                        base: "sm",
                        sm: "sm",
                        md: "sm",
                        lg: "md",
                        xl: "lg",
                        "2xl": "xl",
                      }}
                    >
                      <Text bold color={"red.500"}>
                        *{" "}
                      </Text>
                      Nueva Contraseña:
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"newPassword"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoFocus
                          onBlur={onBlur}
                          onChange={onChange}
                          size={"md"}
                          type={"password"}
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage
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
                    >
                      {errors.newPassword?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </Stack>
              </FormControl>
              <FormControl isInvalid={errors.confirmPassword?.message && true}>
                <Stack
                  direction={{
                    base: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                    xl: "row",
                    "2xl": "row",
                  }}
                  flex={1}
                >
                  <FormControl.Label>
                    <Text
                      bold
                      fontSize={{
                        base: "sm",
                        sm: "sm",
                        md: "sm",
                        lg: "md",
                        xl: "lg",
                        "2xl": "xl",
                      }}
                    >
                      <Text bold color={"red.500"}>
                        *{" "}
                      </Text>
                      Confirma tú Nueva Contraseña:
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"confirmPassword"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoFocus
                          onBlur={onBlur}
                          onChange={onChange}
                          size={"md"}
                          type={"password"}
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage
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
                    >
                      {errors.confirmPassword?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </Stack>
              </FormControl>
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
                onPress={handleSubmit(onSubmit)}
                w={"40%"}
              >
                Resetear Contraseña
              </Button>
            </VStack>
          </VStack>
        )}
      </Center>
    </Layout>
  );
}

export default withRelay(ResetPasswordPage, ResetPasswordPageQuery, {
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
