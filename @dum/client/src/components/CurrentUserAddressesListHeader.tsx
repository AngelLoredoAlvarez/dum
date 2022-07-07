import { Stack, Text, VStack } from "native-base";
import * as React from "react";

function CurrentUserAddressesListHeader() {
  return (
    <VStack alignItems={"center"} borderWidth={1} space={3}>
      <Text
        bold
        fontSize={{
          base: "md",
          sm: "lg",
          md: "xl",
          lg: "2xl",
          xl: "3xl",
          "2xl": "4xl",
        }}
        mt={5}
      >
        Mis Direcciones
      </Text>
      <Stack
        direction={{
          base: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
          "2xl": "row",
        }}
      >
        <Text
          bold
          fontSize={{
            base: "md",
            sm: "lg",
            md: "xl",
            lg: "2xl",
            xl: "3xl",
            "2xl": "4xl",
          }}
        >
          Tu Dirección principal es:
        </Text>
      </Stack>
    </VStack>
  );
}

export default CurrentUserAddressesListHeader;
