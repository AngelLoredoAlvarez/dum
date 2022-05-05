import { Alert as NBAlert, HStack, Text, VStack } from "native-base";
import * as React from "react";

interface AlertProps {
  message: string;
  status: string;
  title: string;
}

function Alert({ message, status, title }: AlertProps) {
  return (
    <NBAlert
      colorScheme={status}
      status={status}
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
            <NBAlert.Icon />
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
              {title}
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
          {message}
        </Text>
      </VStack>
    </NBAlert>
  );
}

export default Alert;
