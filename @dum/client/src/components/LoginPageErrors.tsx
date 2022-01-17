import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Text,
  VStack,
} from "native-base";
import * as React from "react";

function LoginPageErrors({ error, resetErrorBoundary }) {
  return (
    <Center flex={1}>
      <Box
        borderColor="coolGray.200"
        borderRadius="md"
        borderWidth="1"
        rounded="lg"
        safeArea
      >
        <VStack
          space="4"
          divider={
            <Divider
              _dark={{ backgroundColor: "white" }}
              _light={{ backgroundColor: "coolGray.200" }}
              thickness={1}
            />
          }
        >
          <Box px="4" pt="4">
            <Center>
              <Heading size={"lg"}>Verifica tus Credenciales</Heading>
            </Center>
          </Box>
          <Box px="4">
            <Text fontSize={"xl"}>{error}</Text>
          </Box>
          <Box px="4" pb="4">
            <Button onPress={resetErrorBoundary} variant={"solid"}>
              REINTENTAR
            </Button>
          </Box>
        </VStack>
      </Box>
    </Center>
  );
}

export default LoginPageErrors;
