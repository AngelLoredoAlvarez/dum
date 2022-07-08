import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "native-base";
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
    <VStack space={5}>
      <Center>
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
          mb={5}
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
      </Center>
      <VStack
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
      >
        <HStack>
          <Box flex={1} />
          <Tooltip label={"Agregar dirección"}>
            <IconButton
              _hover={{
                bg: "yellow.200",
              }}
              borderRadius="full"
              icon={
                <Icon
                  as={<MaterialIcons name={"add"} />}
                  color="muted.400"
                  size="5"
                />
              }
            />
          </Tooltip>
        </HStack>
        <HStack>
          <Text
            bold
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
            Dirección:
          </Text>
          <Text
            bold
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
            Operaciones:
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default CurrentUserAddressesListHeader;
