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
  VStack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { useErrorHandler } from "react-error-boundary";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-relay/hooks";
import * as Yup from "yup";

import type { LoginMutation as LoginMutationTypes } from "../graphql/Mutations/__generated__/LoginMutation.graphql";
import LoginMutation from "../graphql/Mutations/LoginMutation";

const LoginValidationSchema = Yup.object().shape({
  useremail: Yup.string().required(
    "Ingresa tu Nombre de Usuario y/o Correo Electrónico"
  ),
  password: Yup.string().required("Ingresa tu Contraseña"),
});

interface LoginPageProps {
  useremail: string;
  password: string;
}

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPageProps>({
    defaultValues: {
      useremail: "",
      password: "",
    },
    resolver: yupResolver(LoginValidationSchema),
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [login] = useMutation<LoginMutationTypes>(LoginMutation);

  const router = useRouter();

  const handleError = useErrorHandler();

  const redirectOnLogin = React.useCallback(() => {
    if (router.query.next.includes("producto-agregado")) {
      const { next, product_id, quantity } = router.query;
      router.push(
        `${next}?product_id=${product_id}&quantity=${quantity}`,
        `${next}`
      );
    } else {
      router.push(`${router.query.next}`);
    }
  }, [router]);

  const onSubmit = ({ useremail, password }) => {
    login({
      onCompleted: (response, apiErrors) => {
        if (response.login) {
          if (response.login.user) {
            redirectOnLogin();
          }
        } else if (apiErrors) {
          handleError(apiErrors[0].message);
        }
      },
      onError: () => {},
      variables: {
        LoginInput: {
          username: useremail,
          password: password,
        },
      },
    });
  };

  return (
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
            <FormControl isInvalid={errors.useremail?.message && true}>
              <FormControl.Label>
                Nombre de Usuario y/o Correo Electrónico:
              </FormControl.Label>
              <Controller
                control={control}
                name={"useremail"}
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
                {errors.useremail?.message}
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
                                  showPassword ? "visibility" : "visibility-off"
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
                href="#"
              >
                ¡Registrate!
              </Link>
            </HStack>
          </VStack>
        </Stack>
      </Box>
    </Center>
  );
}

export default LoginForm;
