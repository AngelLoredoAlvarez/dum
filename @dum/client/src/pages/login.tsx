import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Link,
  Stack,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";
import * as Yup from "yup";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Redirect from "../components/Redirect";
import type { LoginMutation as LoginMutationTypes } from "../graphql/Mutations/__generated__/LoginMutation.graphql";
import LoginMutation from "../graphql/Mutations/LoginMutation";
import type { LoginPageQuery as LoginPageQueryTypes } from "../graphql/Queries/__generated__/LoginPageQuery.graphql";
import LoginPageQuery from "../graphql/Queries/LoginPageQuery";
import { getClientEnvironment } from "../lib/client";

const LoginValidationSchema = Yup.object().shape({
  email: Yup.string().required("Ingresa tu Correo Electrónico"),
  password: Yup.string().required("Ingresa tu Contraseña"),
});

interface LoginPageProps {
  email: string;
  password: string;
}

function LoginPage({ preloadedQuery }: RelayProps<{}, LoginPageQueryTypes>) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPageProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(LoginValidationSchema),
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [login] = useMutation<LoginMutationTypes>(LoginMutation);

  const router = useRouter();

  const toast = useToast();

  const redirectOnLogin = React.useCallback(() => {
    if (router.query.hasOwnProperty("next")) {
      if (router.query.next.includes("ultimo-producto-agregado")) {
        router.push(
          `${router.query.next}?product_id=${router.query.product_id}&quantity=${router.query.quantity}`,
          `${router.query.next}`
        );
      } else {
        router.push(`${router.query.next}`);
      }
    } else {
      router.push("/");
    }
  }, [router]);

  const onSubmit = ({ email, password }) => {
    login({
      onCompleted: (response, apiErrors) => {
        if (response.login) {
          if (response.login.user) {
            redirectOnLogin();
          }
        } else if (apiErrors) {
          toast.show({
            description: `${apiErrors[0].message}`,
            isClosable: true,
            placement: "top",
            status: "error",
            title:
              apiErrors[0].extensions.exception.code === "CREDS"
                ? "Verifica tus Datos"
                : apiErrors[0].extensions.exception.code === "LOCKD" &&
                  "Cuenta Bloqueada",
            variant: "top-accent",
          });
        }
      },
      onError: (err) => {
        console.log(err);
      },
      variables: {
        LoginInput: {
          email: email,
          password: password,
        },
      },
    });
  };

  const redirectOnRegister = React.useCallback(() => {
    if (router.query.next.includes("ultimo-producto-agregado")) {
      router.push(
        `/registrate?next=${encodeURIComponent(
          router.query.next.toString()
        )}&product_id=${router.query.product_id}&quantity=${
          router.query.quantity
        }`
      );
    } else {
      router.push(
        `/registrate?next=${encodeURIComponent(router.query.next.toString())}`
      );
    }
  }, [router]);

  const loginPageQuery = usePreloadedQuery<LoginPageQueryTypes>(
    LoginPageQuery,
    preloadedQuery
  );

  if (loginPageQuery.currentUser !== null) return <Redirect href="/" />;

  return (
    <Layout currentUser={loginPageQuery}>
      <Center flex="1">
        <Box
          borderColor="coolGray.200"
          borderRadius="md"
          borderWidth="1"
          maxW="80"
          rounded="lg"
          safeArea
        >
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Center>
                <Heading
                  _dark={{
                    color: "warmGray.50",
                  }}
                  _light={{
                    color: "coolGray.800",
                  }}
                  fontWeight="600"
                  size="lg"
                >
                  ¡Bienvenido!
                </Heading>
                <Heading
                  _dark={{
                    color: "warmGray.200",
                  }}
                  _light={{
                    color: "coolGray.800",
                  }}
                  color="coolGray.600"
                  fontWeight="medium"
                  mt="1"
                  size="xs"
                >
                  ¡Inicia Sesión para Continuar!
                </Heading>
              </Center>
            </Stack>
            <VStack space={3} mt="5">
              <FormControl isInvalid={errors.email?.message && true}>
                <FormControl.Label>Correo Electrónico:</FormControl.Label>
                <Controller
                  control={control}
                  name={"email"}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      _focus={{
                        borderColor: "yellow.400",
                      }}
                      autoFocus
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
                <FormControl.ErrorMessage>
                  {errors.email?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.password?.message && true}>
                <FormControl.Label>Contraseña:</FormControl.Label>
                <Controller
                  control={control}
                  name={"password"}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      _focus={{
                        borderColor: "yellow.400",
                      }}
                      InputRightElement={
                        <IconButton
                          _hover={{
                            bg: "yellow.200",
                          }}
                          borderRadius="full"
                          icon={
                            <Icon
                              as={
                                <MaterialIcons
                                  name={
                                    showPassword
                                      ? "visibility"
                                      : "visibility-off"
                                  }
                                />
                              }
                              color="muted.400"
                              size="5"
                            />
                          }
                          onPress={() =>
                            setShowPassword((prevState) => !prevState)
                          }
                        />
                      }
                      onBlur={onBlur}
                      onChange={onChange}
                      type={showPassword ? "text" : "password"}
                      value={value}
                    />
                  )}
                />
                <FormControl.ErrorMessage>
                  {errors.password?.message}
                </FormControl.ErrorMessage>
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "amber.600",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  ¿Olvidaste tu Contraseña?
                </Link>
              </FormControl>
              <Button
                colorScheme="amber"
                leftIcon={<MaterialIcons color="white" name="vpn-key" />}
                mt="2"
                onPress={handleSubmit(onSubmit)}
              >
                Iniciar Sesión
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Soy un usuario nuevo.{" "}
                </Text>
                <Link
                  _text={{
                    color: "amber.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  onPress={redirectOnRegister}
                >
                  ¡Registrate!
                </Link>
              </HStack>
            </VStack>
          </Stack>
        </Box>
      </Center>
    </Layout>
  );
}

export default withRelay(LoginPage, LoginPageQuery, {
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
