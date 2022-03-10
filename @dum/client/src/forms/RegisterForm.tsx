import { HStack, Input, Stack, Text, VStack } from "native-base";
import * as React from "react";

function RegisterForm() {
  return (
    <VStack
      ml={{
        base: 3,
        sm: 3,
        md: 3,
        lg: 3,
        xl: 3,
        "2xl": 96,
      }}
      mr={{
        base: 3,
        sm: 3,
        md: 3,
        lg: 3,
        xl: 3,
        "2xl": 96,
      }}
      space={10}
    >
      <VStack
        borderColor="coolGray.200"
        borderRadius="md"
        borderWidth="1"
        rounded="lg"
        safeArea
        space={3}
        px={"3"}
        py={"3"}
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
          space={3}
        >
          <HStack flex={1}>
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
            <Input autoFocus flex={1} />
          </HStack>
          <HStack flex={1}>
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
            <Input flex={1} />
          </HStack>
          <HStack flex={1}>
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
            <Input flex={1} />
          </HStack>
        </Stack>
      </VStack>
      <VStack
        borderColor="coolGray.200"
        borderRadius="md"
        borderWidth="1"
        rounded="lg"
        safeArea
        space={3}
        px={"3"}
        py={"3"}
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
          Información de Contacto:
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
          space={3}
        >
          <HStack flex={1}>
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
            <Input flex={1} />
          </HStack>
          <HStack flex={1}>
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
            <Input flex={1} />
          </HStack>
          <HStack
            w={{
              base: "100%",
              sm: "100%",
              md: "",
              lg: "",
              xl: "",
              "2xl": "50%",
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
              Calle:{" "}
            </Text>
            <Input flex={1} />
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
            <Input w={"10%"} />
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
            <Input w={"10%"} />
          </HStack>
        </Stack>
      </VStack>
    </VStack>
  );
}

export default RegisterForm;
