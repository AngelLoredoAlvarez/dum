import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  FormControl,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "native-base";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";

const RegisterValidationSchema = Yup.object().shape({
  name: Yup.string().required("Ingresa tu Nombre(s)"),
  firstSurname: Yup.string().required("Ingresa tu Apellido Paterno"),
  town: Yup.string().required("Selecciona el Municipio"),
  suburb: Yup.string().required("Selecciona la Colonia"),
  street: Yup.string().required("Ingresa la Calle"),
  exteriorNumber: Yup.string().required("Ingresa el Número Exterior"),
  firstNumber: Yup.string().test(
    "oneIsRequired",
    "One of Field1, Field2, Field3 or Field4 must be entered",
    (_item, testContext) => {
      return (
        testContext.parent.firstNumber ||
        testContext.parent.secondNumber ||
        testContext.parent.thirdNumber
      );
    }
  ),
  secondNumber: Yup.string().test(
    "oneIsRequired",
    "One of Field1, Field2, Field3 or Field4 must be entered",
    (_item, testContext) => {
      return (
        testContext.parent.firstNumber ||
        testContext.parent.secondNumber ||
        testContext.parent.thirdNumber
      );
    }
  ),
  thirdNumber: Yup.string().test(
    "oneIsRequired",
    "One of Field1, Field2, Field3 or Field4 must be entered",
    (_item, testContext) => {
      return (
        testContext.parent.firstNumber ||
        testContext.parent.secondNumber ||
        testContext.parent.thirdNumber
      );
    }
  ),
});

interface RegisterFormProps {
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
}

function RegisterForm() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormProps>({
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
    },
    resolver: yupResolver(RegisterValidationSchema),
  });

  const onSubmit = ({ name }) => {
    console.log(name);
  };

  return (
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
                    flex={1}
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    _focus={{
                      borderColor: "yellow.400",
                    }}
                    flex={1}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
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
              <Controller
                control={control}
                name={"suburb"}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    _focus={{
                      borderColor: "yellow.400",
                    }}
                    flex={1}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
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
                <Controller
                  control={control}
                  name={"street"}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      _focus={{
                        borderColor: "yellow.400",
                      }}
                      flex={1}
                      onBlur={onBlur}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                />
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
                      onBlur={onBlur}
                      onChange={onChange}
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
                      onBlur={onBlur}
                      onChange={onChange}
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
          <HStack alignItems={"center"} flex={1}>
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
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              flex={1}
            />
          </HStack>
          <HStack alignItems={"center"} flex={1}>
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
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              flex={1}
            />
          </HStack>
          <HStack alignItems={"center"} flex={1}>
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
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              flex={1}
            />
          </HStack>
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
          <HStack alignItems={"center"} flex={1}>
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
                {" "}
                *{" "}
              </Text>
              Correo Electrónico:{" "}
            </Text>
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              flex={1}
            />
          </HStack>
          <HStack alignItems={"center"} flex={1}>
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
                {" "}
                *{" "}
              </Text>
              Contraseña:{" "}
            </Text>
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              flex={1}
            />
          </HStack>
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
        <Stack flex={1}>
          <Text
            flex={1}
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
            <Checkbox colorScheme={"amber"} value={"yes"} /> Declaro que soy
            mayor de edad, que acepto los{" "}
            <Link href="#">Términos y Condiciones</Link> y autorizo el uso de
            mis datos de acuerdo a la{" "}
            <Link href="#">Declaración de Privacidad</Link>.
          </Text>
        </Stack>
        <Button
          colorScheme="amber"
          //isDisabled={true}
          onPress={handleSubmit(onSubmit)}
          size={"lg"}
        >
          Continuar
        </Button>
      </Stack>
    </VStack>
  );
}

export default RegisterForm;
