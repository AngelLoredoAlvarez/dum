import { Box, Center, Heading, HStack, Spinner } from "native-base";
import * as React from "react";

function Loading() {
  return (
    <Box _dark={{ bg: "coolGray.600" }} _light={{ bg: "warmGray.50" }} flex={1}>
      <Center flex={1}>
        <HStack space={2}>
          <Spinner accessibilityLabel="Cargando..." size={"lg"} />
          <Heading fontSize="lg">Cargando...</Heading>
        </HStack>
      </Center>
    </Box>
  );
}

export default Loading;
