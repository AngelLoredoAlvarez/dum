import { MaterialIcons } from "@expo/vector-icons";
import { HStack, Icon, IconButton, Text, Tooltip } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { CurrentUserAddressListItemFragment_currentUserAddress$key } from "../graphql/Fragments/__generated__/CurrentUserAddressListItemFragment_currentUserAddress.graphql";
import CurrentUserAddressListItemFragment from "../graphql/Fragments/CurrentUserAddressListItemFragment";

interface CurrentUserAddressesListItemProps {
  fullAddress: CurrentUserAddressListItemFragment_currentUserAddress$key;
}

function CurrentUserAddressesListItem(
  props: CurrentUserAddressesListItemProps
) {
  const { fullAddress, isMain } =
    useFragment<CurrentUserAddressListItemFragment_currentUserAddress$key>(
      CurrentUserAddressListItemFragment,
      props.fullAddress
    );

  return (
    <HStack
      alignItems={"center"}
      ml={{
        base: 5,
        sm: 5,
        md: 50,
        lg: 100,
        xl: 200,
        "2xl": 250,
      }}
      mr={{
        base: 5,
        sm: 5,
        md: 50,
        lg: 100,
        xl: 200,
        "2xl": 250,
      }}
      justifyContent={"center"}
    >
      <Text
        flex={1}
        fontSize={{
          base: "xs",
          sm: "sm",
          md: "md",
          lg: "lg",
          xl: "xl",
          "2xl": "2xl",
        }}
        textAlign={"center"}
      >
        {fullAddress}
      </Text>
      <HStack alignItems={"center"} justifyContent={"center"} space={1}>
        <Tooltip
          label={
            isMain ? "Tu dirección principal" : "Hacer dirección principal"
          }
        >
          <IconButton
            _hover={{
              bg: "yellow.200",
            }}
            backgroundColor={isMain && "green.300"}
            borderRadius="full"
            icon={
              <Icon
                as={<MaterialIcons name={"check"} />}
                color="muted.400"
                size="5"
              />
            }
          />
        </Tooltip>
        <Tooltip label={"Modificar dirección"}>
          <IconButton
            _hover={{
              bg: "yellow.200",
            }}
            borderRadius="full"
            icon={
              <Icon
                as={<MaterialIcons name={"edit"} />}
                color="muted.400"
                size="5"
              />
            }
          />
        </Tooltip>
        <Tooltip label={"Eliminar dirección"}>
          <IconButton
            _hover={{
              bg: "yellow.200",
            }}
            borderRadius="full"
            icon={
              <Icon
                as={<MaterialIcons name={"delete"} />}
                color="muted.400"
                size="5"
              />
            }
          />
        </Tooltip>
      </HStack>
    </HStack>
  );
}

export default CurrentUserAddressesListItem;
