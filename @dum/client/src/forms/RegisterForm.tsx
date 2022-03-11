import {
  Button,
  Checkbox,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "native-base";
import * as React from "react";

function RegisterForm() {
  return (
    <VStack
      ml={{
        base: 3,
        sm: 3,
        md: 6,
        lg: 10,
        xl: 24,
        "2xl": 48,
      }}
      mr={{
        base: 3,
        sm: 3,
        md: 6,
        lg: 10,
        xl: 24,
        "2xl": 48,
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
                *{" "}
              </Text>
              Nombre(s):{" "}
            </Text>
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              autoFocus
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
                *{" "}
              </Text>
              Apellido Paterno:{" "}
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
              {" "}
              Apellido Materno:{" "}
            </Text>
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              flex={1}
            />
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
          <HStack
            alignItems={"center"}
            w={{
              base: "100%",
              sm: "100%",
              md: "100%",
              lg: "25%",
              xl: "25%",
              "2xl": "25%",
            }}
          >
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
              Municipio:{" "}
            </Text>
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              flex={1}
            />
          </HStack>
          <HStack
            alignItems={"center"}
            w={{
              base: "100%",
              sm: "100%",
              md: "100%",
              lg: "25%",
              xl: "25%",
              "2xl": "25%",
            }}
          >
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
              Colonia:{" "}
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
                *{" "}
              </Text>
              Calle:{" "}
            </Text>
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              flex={1}
            />
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
              No. Ext.:{" "}
            </Text>
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              w={"10%"}
            />
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
              {" "}
              No. Int.:{" "}
            </Text>
            <Input
              _focus={{
                borderColor: "yellow.400",
              }}
              w={"10%"}
            />
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
        <Button colorScheme="amber" isDisabled={true} size={"lg"}>
          Continuar
        </Button>
      </Stack>
    </VStack>
  );
}

export default RegisterForm;
