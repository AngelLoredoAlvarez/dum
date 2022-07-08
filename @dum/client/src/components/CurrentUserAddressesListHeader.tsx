import { Stack, Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { CurrentUserFullMainAddressFragment_currentUserFullMainAddress$key } from "../graphql/Fragments/__generated__/CurrentUserFullMainAddressFragment_currentUserFullMainAddress.graphql";
import CurrentUserFullMainAddressFragment from "../graphql/Fragments/CurrentUserFullMainAddressFragment";

interface CurrentUserAddressesListHeaderProps {
  fullMainAddress: CurrentUserFullMainAddressFragment_currentUserFullMainAddress$key;
}

function CurrentUserAddressesListHeader(
  props: CurrentUserAddressesListHeaderProps
) {
  const { fullMainAddress } =
    useFragment<CurrentUserFullMainAddressFragment_currentUserFullMainAddress$key>(
      CurrentUserFullMainAddressFragment,
      props.fullMainAddress
    );

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
        alignItems={"center"}
        direction={{
          base: "column",
          sm: "column",
          md: "row",
          lg: "row",
          xl: "row",
          "2xl": "row",
        }}
        space={3}
      >
        <Text
          bold
          fontSize={{
            base: "sm",
            sm: "md",
            md: "lg",
            lg: "xl",
            xl: "2xl",
            "2xl": "3xl",
          }}
        >
          Tu Dirección principal es:{" "}
        </Text>
        <Text
          fontSize={{
            base: "sm",
            sm: "md",
            md: "lg",
            lg: "xl",
            xl: "2xl",
            "2xl": "3xl",
          }}
        >
          {fullMainAddress}
        </Text>
      </Stack>
    </VStack>
  );
}

export default CurrentUserAddressesListHeader;
