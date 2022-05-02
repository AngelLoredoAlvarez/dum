import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  CheckIcon,
  FormControl,
  HStack,
  Input,
  Link,
  ScrollView,
  Select,
  Stack,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { mask } from "react-native-mask-text";
import { useMutation, usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";
import * as Yup from "yup";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Redirect from "../components/Redirect";
import StreetsList from "../components/StreetsList";
import SuburbsList from "../components/SuburbsList";
import type { AddToShoppingListMutation as AddToShoppingListMutationTypes } from "../graphql/Mutations/__generated__/AddToShoppingListMutation.graphql";
import type { RegisterMutation as RegisterMutationTypes } from "../graphql/Mutations/__generated__/RegisterMutation.graphql";
import AddToShoppingListMutation from "../graphql/Mutations/AddToShoppingListMutation";
import RegisterMutation from "../graphql/Mutations/RegisterMutation";
import type { RegisterPageQuery as RegisterPageQueryTypes } from "../graphql/Queries/__generated__/RegisterPageQuery.graphql";
import RegisterPageQuery from "../graphql/Queries/RegisterPageQuery";
import { getClientEnvironment } from "../lib/client";

/* Regular Expression for the Yup Schema Validations */
const phoneRegExp = /^(([0-9]{3}) |[0-9]{3}-)[0-9]{3} |[0-9]{4}$/;
const emailRegExp = /[^@]+@[^@]+\.[^@]+/;
const acceptTermsAndConditionsRegExp = /\byes\b/g;
/* Regular Expression for the Yup Schema Validations */

/* Yup Schema Validation */
const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string().required("Ingresa tu Nombre(s)"),
  firstSurname: Yup.string().required("Ingresa tu Apellido Paterno"),
  town: Yup.string().required("Selecciona el Municipio"),
  suburb: Yup.string().required("Selecciona la Colonia"),
  street: Yup.string().required("Ingresa la Calle"),
  exteriorNumber: Yup.string().required("Ingresa el Número Exterior"),
  firstNumber: Yup.string()
    .required("Ingresa un Número de Contacto")
    .matches(phoneRegExp, "Ingresa un Número Teléfonico valido"),
  secondNumber: Yup.string()
    .required("Ingresa un Número de Contacto")
    .matches(phoneRegExp, "Ingresa un Número Teléfonico valido"),
  thirdNumber: Yup.string().notRequired().matches(phoneRegExp, {
    message: "Ingresa un Número Teléfonico valido",
    excludeEmptyString: true,
  }),
  email: Yup.string()
    .required("Ingresa un Correo Electrónico")
    .matches(emailRegExp, "Ingresa un Correo Electrónico Valido"),
  password: Yup.string()
    .required("Ingresa una Contraseña")
    .min(8, "Tu contraseña debe de ser igual o mayor a 8 digitos"),
  confirmPassword: Yup.string()
    .required("Confirma tu Contraseña")
    .oneOf([Yup.ref("password")], "Tus contraseñas no concuerdan"),
  acceptTermsAndConditions: Yup.string()
    .required()
    .matches(
      acceptTermsAndConditionsRegExp,
      "Debes aceptar los Teminos y Condiciones"
    ),
});
/* Yup Schema Validation */

/* Types Definitions for the useForm() hook */
interface UseFormProps {
  name: string;
  firstSurname: string;
  secondSurname?: string;
  town: string;
  suburb: string;
  street: string;
  exteriorNumber: string;
  interiorNumber?: string;
  firstNumber?: string;
  secondNumber?: string;
  thirdNumber?: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTermsAndConditions: string;
}
/* Types Definitions for the useForm() hook */

function RegisterPage({
  preloadedQuery,
}: RelayProps<{}, RegisterPageQueryTypes>) {
  // Executes the Mutation to Register a new User
  const [register] = useMutation<RegisterMutationTypes>(RegisterMutation);

  // Executes the mutation when the user comes from the Product Page Details
  const [addToShoppingList] = useMutation<AddToShoppingListMutationTypes>(
    AddToShoppingListMutation
  );

  // useState() hook that sets the townId value
  const [townId, setTownId] = React.useState<any>("");

  // useState() hook that sets the suburbId value
  const [suburbId, setSuburbId] = React.useState<any>("");

  // useState() hook that sets the isMounted value
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  // useEffect() hook used with the Suspense component
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handles all that is needed for the Form State
  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
  } = useForm<UseFormProps>({
    defaultValues: {
      name: "",
      firstSurname: "",
      secondSurname: "",
      town: "",
      suburb: "",
      street: "",
      exteriorNumber: "",
      interiorNumber: "",
      firstNumber: "",
      secondNumber: "",
      thirdNumber: "",
      acceptTermsAndConditions: "no",
    },
    resolver: yupResolver(RegisterValidationSchema),
  });

  // Callback that handles the mask of the Exterior Number TextField
  const handleExteriorNumberChange = (val: string) => {
    const formated: string = mask(val, "9999");
    setValue("exteriorNumber", formated);
  };

  // Callback that handles the mask of the Interior Number TextField
  const handleInteriorNumberChange = (val: string) => {
    const formated: string = mask(val, "9999");
    setValue("interiorNumber", formated);
  };

  // Callback that handles the mask of the Phone Number TextField
  const handlePhoneFieldChange = (val: string, phoneField: string) => {
    const formatedText: string = mask(val, "(999) 999 9999");

    if (phoneField.includes("firstNumber"))
      setValue("firstNumber", formatedText);
    else if (phoneField.includes("secondNumber"))
      setValue("secondNumber", formatedText);
    else if (phoneField.includes("thirdNumber"))
      setValue("thirdNumber", formatedText);
  };

  const router = useRouter();

  // Callback that will Redirect the user after a correct Registation
  const redirectAfterRegister = React.useCallback(() => {
    if (router.query.hasOwnProperty("next")) {
      router.push(`${router.query.next}`);
    } else {
      router.push("/");
    }
  }, [router]);

  // Hook to show messages to the user as Toast
  const toast = useToast();

  // Callback that will handle the Submit of the Form
  const onSubmit = (data: UseFormProps) => {
    register({
      onCompleted: (response, apiErrors) => {
        if (response.register) {
          if (response.register.user) {
            if (router.query.next.includes("ultimo-producto-agregado")) {
              addToShoppingList({
                onCompleted: (response, apiErrors) => {
                  if (response.addToShoppingList) {
                    if (response.addToShoppingList.shoppingListDetail) {
                      redirectAfterRegister();
                    } else {
                      console.log(apiErrors);
                    }
                  }
                },
                onError: (err) => {
                  console.log(err);
                },
                variables: {
                  AddToShoppingListInput: {
                    productId: `${router.query.product_id}`,
                    selectedQuantity: Number.parseInt(
                      `${router.query.quantity}`
                    ),
                  },
                },
              });
            } else {
              redirectAfterRegister();
            }
          }
        } else {
          toast.show({
            description: `${apiErrors[0].message}`,
            isClosable: true,
            placement: "top",
            status: "error",
            tintColor: "danger.400",
            title: "Verifica tus Datos",
            variant: "top-accent",
          });
        }
      },
      onError: (err) => {
        console.log(err);
      },
      variables: {
        RegisterInput: {
          name: data.name,
          firstSurname: data.firstSurname,
          secondSurname: data.secondSurname,
          townId: data.town,
          suburbId: data.suburb,
          streetId: data.street,
          exteriorNumber: data.exteriorNumber,
          interiorNumber: data.interiorNumber,
          phoneOne: data.firstNumber,
          phoneTwo: data.secondNumber,
          phoneThree: data.thirdNumber,
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  // Fetch the hole Query
  const registerPageQuery = usePreloadedQuery<RegisterPageQueryTypes>(
    RegisterPageQuery,
    preloadedQuery
  );

  if (registerPageQuery.currentUser !== null) return <Redirect href="/" />;

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
          {/*STARTS REGISTER FORM*/}
          <VStack
            ml={{
              base: 3,
              sm: 3,
              md: 6,
              lg: 10,
              xl: 20,
              "2xl": 40,
            }}
            mr={{
              base: 3,
              sm: 3,
              md: 6,
              lg: 10,
              xl: 20,
              "2xl": 40,
            }}
            space={10}
          >
            <VStack
              borderColor="coolGray.500"
              borderRadius="md"
              borderWidth="1"
              rounded="lg"
              safeArea
              space={10}
              px={"5"}
              py={"5"}
            >
              <Text
                bold
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
                Información Personal:
              </Text>
              <Stack
                direction={{
                  base: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                  xl: "row",
                  "2xl": "row",
                }}
                space={5}
              >
                <FormControl
                  flex={1}
                  flexDir={"row"}
                  isInvalid={errors.name?.message && true}
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
                      Nombre(s):
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"name"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoFocus
                          autoComplete={"off"}
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage>
                      {errors.name?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </FormControl>
                <FormControl
                  flex={1}
                  flexDir={"row"}
                  isInvalid={errors.firstSurname?.message && true}
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
                      Apellido Paterno:
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"firstSurname"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoComplete={"off"}
                          flex={1}
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage>
                      {errors.firstSurname?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </FormControl>
                <FormControl flex={1} flexDir={"row"}>
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
                      Apellido Materno:
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"secondSurname"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoComplete={"off"}
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  </VStack>
                </FormControl>
              </Stack>
              <Stack
                direction={{
                  base: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                  xl: "row",
                  "2xl": "row",
                }}
                space={{
                  base: 2,
                  sm: 2,
                  md: 2,
                  lg: 2,
                  xl: 2,
                  "2xl": 5,
                }}
              >
                <FormControl
                  flexDir={"row"}
                  isInvalid={errors.town?.message && true}
                  w={{
                    base: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "25%",
                    xl: "25%",
                    "2xl": "25%",
                  }}
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
                      Municipio:
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"town"}
                      render={({ field: { value } }) => (
                        <Select
                          _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size={5} />,
                          }}
                          defaultValue={""}
                          onValueChange={(itemValue) => {
                            setValue("town", itemValue);
                            setTownId(getValues("town"));
                          }}
                          placeholder="Selecciona..."
                          selectedValue={value}
                        >
                          {registerPageQuery.towns.edges.map(({ node }) => (
                            <Select.Item
                              key={node.id}
                              label={node.name}
                              value={node.rowId.toString()}
                            />
                          ))}
                        </Select>
                      )}
                    />
                    <FormControl.ErrorMessage>
                      {errors.town?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </FormControl>
                <FormControl
                  flexDir={"row"}
                  isInvalid={errors.suburb?.message && true}
                  w={{
                    base: "100%",
                    sm: "100%",
                    md: "100%",
                    lg: "25%",
                    xl: "25%",
                    "2xl": "25%",
                  }}
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
                      Colonia:
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    {townId === "" ? (
                      <Select isDisabled={true} placeholder={"Selecciona..."} />
                    ) : (
                      <Controller
                        control={control}
                        name={"suburb"}
                        render={({ field: { value } }) =>
                          isMounted ? (
                            <React.Suspense fallback={<Loading />}>
                              <SuburbsList
                                selectedValue={value}
                                setSuburbId={setSuburbId}
                                setValue={setValue}
                                suburbs={registerPageQuery}
                                townId={townId}
                              />
                            </React.Suspense>
                          ) : (
                            <SuburbsList
                              selectedValue={value}
                              setSuburbId={setSuburbId}
                              setValue={setValue}
                              suburbs={registerPageQuery}
                              townId={townId}
                            />
                          )
                        }
                      />
                    )}
                    <FormControl.ErrorMessage>
                      {errors.suburb?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </FormControl>
                <HStack
                  flex={1}
                  space={{
                    base: 2,
                    sm: 2,
                    md: 2,
                    lg: 2,
                    xl: 3,
                    "2xl": 5,
                  }}
                >
                  <FormControl
                    flexDir={"row"}
                    isInvalid={errors.street?.message && true}
                    w={{
                      base: "40%",
                      sm: "42%",
                      md: "55%",
                      lg: "41%",
                      xl: "45%",
                      "2xl": "44%",
                    }}
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
                        Calle:
                      </Text>
                    </FormControl.Label>
                    <VStack flex={1}>
                      {suburbId === "" ? (
                        <Select
                          isDisabled={true}
                          placeholder={"Selecciona..."}
                        />
                      ) : (
                        <Controller
                          control={control}
                          name={"street"}
                          render={({ field: { value } }) =>
                            isMounted ? (
                              <React.Suspense fallback={<Loading />}>
                                <StreetsList
                                  selectedValue={value}
                                  setValue={setValue}
                                  streets={registerPageQuery}
                                  suburbId={suburbId}
                                />
                              </React.Suspense>
                            ) : (
                              <StreetsList
                                selectedValue={value}
                                setValue={setValue}
                                streets={registerPageQuery}
                                suburbId={suburbId}
                              />
                            )
                          }
                        />
                      )}
                      <FormControl.ErrorMessage>
                        {errors.street?.message}
                      </FormControl.ErrorMessage>
                    </VStack>
                  </FormControl>
                  <FormControl
                    flexDir={"row"}
                    isInvalid={errors.exteriorNumber?.message && true}
                    w={{
                      base: "",
                      sm: "29%",
                      md: "23%",
                      lg: "30%",
                      xl: "27%",
                      "2xl": "27%",
                    }}
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
                        No. Ext.:
                      </Text>
                    </FormControl.Label>
                    <VStack flex={1}>
                      <Controller
                        control={control}
                        name={"exteriorNumber"}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            _focus={{
                              borderColor: "yellow.400",
                            }}
                            autoComplete={"off"}
                            onBlur={onBlur}
                            onChange={onChange}
                            onChangeText={(val: string) =>
                              handleExteriorNumberChange(val)
                            }
                            value={value}
                          />
                        )}
                      />
                      <FormControl.ErrorMessage>
                        {errors.exteriorNumber?.message}
                      </FormControl.ErrorMessage>
                    </VStack>
                  </FormControl>
                  <FormControl
                    flexDir={"row"}
                    w={{
                      base: "",
                      sm: "25%",
                      md: "20%",
                      lg: "25%",
                      xl: "22%",
                      "2xl": "22%",
                    }}
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
                        No. Int:
                      </Text>
                    </FormControl.Label>
                    <VStack flex={1} h={"100%"}>
                      <Controller
                        control={control}
                        name={"interiorNumber"}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            _focus={{
                              borderColor: "yellow.400",
                            }}
                            autoComplete={"off"}
                            onBlur={onBlur}
                            onChange={onChange}
                            onChangeText={(val: string) =>
                              handleInteriorNumberChange(val)
                            }
                            value={value}
                          />
                        )}
                      />
                    </VStack>
                  </FormControl>
                </HStack>
              </Stack>
              <Stack
                direction={{
                  base: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                  xl: "row",
                  "2xl": "row",
                }}
                space={5}
              >
                <FormControl
                  flex={1}
                  flexDir={"row"}
                  isInvalid={errors.firstNumber?.message && true}
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
                      Teléfono 1:{" "}
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"firstNumber"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoComplete={"off"}
                          onBlur={onBlur}
                          onChange={onChange}
                          onChangeText={(val: string) =>
                            handlePhoneFieldChange(val, "firstNumber")
                          }
                          placeholder={"(___) ___ ____"}
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage>
                      {errors.firstNumber?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </FormControl>
                <FormControl
                  flex={1}
                  flexDir={"row"}
                  isInvalid={errors.secondNumber?.message && true}
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
                      Teléfono 2:{" "}
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"secondNumber"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoComplete={"off"}
                          onBlur={onBlur}
                          onChange={onChange}
                          onChangeText={(val: string) =>
                            handlePhoneFieldChange(val, "secondNumber")
                          }
                          placeholder={"(___) ___ ____"}
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage>
                      {errors.secondNumber?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </FormControl>
                <FormControl
                  flex={1}
                  flexDir={"row"}
                  isInvalid={errors.thirdNumber?.message && true}
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
                      Teléfono 3:{" "}
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"thirdNumber"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoComplete={"off"}
                          onBlur={onBlur}
                          onChange={onChange}
                          onChangeText={(val: string) =>
                            handlePhoneFieldChange(val, "thirdNumber")
                          }
                          placeholder={"(___) ___ ____"}
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage>
                      {errors.thirdNumber?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </FormControl>
              </Stack>
            </VStack>
            <VStack
              borderColor="coolGray.500"
              borderRadius="md"
              borderWidth="1"
              rounded="lg"
              safeArea
              space={5}
              px={"5"}
              py={"5"}
            >
              <Text
                bold
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
                Información para Inicio de Sesión:
              </Text>
              <Stack
                direction={{
                  base: "column",
                  sm: "column",
                  md: "column",
                  lg: "row",
                  xl: "row",
                  "2xl": "row",
                }}
                space={5}
              >
                <FormControl
                  flex={1}
                  flexDir={"row"}
                  isInvalid={errors.email?.message && true}
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
                      Correo Electrónico:
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"email"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoComplete={"off"}
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage>
                      {errors.email?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </FormControl>
                <FormControl
                  flex={1}
                  flexDir={"row"}
                  isInvalid={errors.password?.message && true}
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
                      Contraseña:
                    </Text>
                  </FormControl.Label>
                  <VStack flex={1}>
                    <Controller
                      control={control}
                      name={"password"}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                          _focus={{
                            borderColor: "yellow.400",
                          }}
                          autoComplete={"off"}
                          onBlur={onBlur}
                          onChange={onChange}
                          type="password"
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage>
                      {errors.password?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </FormControl>
                <FormControl
                  flex={1}
                  flexDir={"row"}
                  isInvalid={errors.confirmPassword?.message && true}
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
                      Confirmar Contraseña:
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
                          autoComplete={"off"}
                          onBlur={onBlur}
                          onChange={onChange}
                          type="password"
                          value={value}
                        />
                      )}
                    />
                    <FormControl.ErrorMessage>
                      {errors.confirmPassword?.message}
                    </FormControl.ErrorMessage>
                  </VStack>
                </FormControl>
              </Stack>
            </VStack>
            <Stack
              borderColor="coolGray.500"
              borderRadius="md"
              borderWidth="1"
              direction={{
                base: "column",
                sm: "column",
                md: "column",
                lg: "row",
                xl: "row",
                "2xl": "row",
              }}
              rounded="lg"
              safeArea
              space={5}
              px={"5"}
              py={"5"}
            >
              <FormControl
                flex={1}
                isInvalid={errors.acceptTermsAndConditions?.message && true}
              >
                <HStack alignContent={"center"} alignItems={"center"} flex={1}>
                  <Controller
                    control={control}
                    name={"acceptTermsAndConditions"}
                    render={({ field: { value } }) => (
                      <Checkbox
                        accessibilityLabel="acceptTermsAndConditions"
                        colorScheme={"amber"}
                        onChange={(isSelected: boolean) => {
                          if (isSelected)
                            setValue("acceptTermsAndConditions", "yes");
                          else setValue("acceptTermsAndConditions", "no");
                        }}
                        value={value}
                      />
                    )}
                  />
                  <Box mr={3} />
                  <Text
                    fontSize={{
                      base: "sm",
                      sm: "sm",
                      md: "sm",
                      lg: "md",
                      xl: "lg",
                      "2xl": "xl",
                    }}
                    textAlign={"justify"}
                  >
                    Declaro que soy mayor de edad, que acepto los{" "}
                    <Link href="#">Términos y Condiciones</Link> y autorizo el
                    uso de mis datos de acuerdo a la{" "}
                    <Link href="#">Declaración de Privacidad</Link>.
                  </Text>
                </HStack>
                <FormControl.ErrorMessage>
                  {errors.acceptTermsAndConditions?.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <Box>
                <Button
                  colorScheme="amber"
                  onPress={handleSubmit(onSubmit)}
                  size={"lg"}
                >
                  Continuar
                </Button>
              </Box>
            </Stack>
          </VStack>
          {/*ENDS REGISTER FORM*/}
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
