import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  Box,
  Divider,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { useFragment, useMutation } from "react-relay";

import { CurrentUserFragment_user$key } from "../graphql/Fragments/__generated__/CurrentUserFragment_user.graphql";
import CurrentUserFragment from "../graphql/Fragments/CurrentUserFragment";
import type { LogoutMutation as LogoutMutationTypes } from "../graphql/Mutations/__generated__/LogoutMutation.graphql";
import LogoutMutation from "../graphql/Mutations/LogoutMutation";
import Avatar from "./Avatar";

interface CustomDrawerContentProps {
  currentUser: CurrentUserFragment_user$key;
}

function getCharactersFromName(fullName: string) {
  const nameArray = fullName.split(" ", 4);
  let characters;

  if (nameArray.length === 4)
    characters = `${nameArray[0].charAt(0)} ${nameArray[2].charAt(0)}`;
  else if (nameArray.length === 3 || nameArray.length === 2)
    characters = `${nameArray[0].charAt(0)} ${nameArray[1].charAt(0)}`;

  return characters;
}

function CustomDrawerContent(props: CustomDrawerContentProps) {
  const { currentUser } = useFragment(CurrentUserFragment, props.currentUser);

  const [logout] = useMutation<LogoutMutationTypes>(LogoutMutation);

  const router = useRouter();

  const { dispatch } = useNavigation();

  return (
    <DrawerContentScrollView {...props}>
      <VStack space="6" my="2" mx="1">
        <Avatar
          imageURI={currentUser?.avatarUrl}
          size="lg"
          text={getCharactersFromName(
            currentUser?.fullName ? currentUser.fullName : "DUM"
          )}
        />
        <Box px="4">
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            {currentUser?.fullName}
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3"></VStack>
          <VStack space="5">
            <Text fontWeight="500" fontSize="14" px="5" color="gray.500">
              Estado de Cuenta
            </Text>
            <VStack space="3">
              <HStack px="5" py="2" space="7" alignItems="center">
                <Icon
                  color="gray.500"
                  size="5"
                  as={<MaterialIcons name="attach-money" />}
                />
                <Text color="gray.700" fontWeight="500">
                  Adeudo:
                </Text>
                <Text color="gray.700" fontWeight="500">
                  $ 1,000,000.00
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
        <VStack divider={<Divider />} space="4">
          <VStack space="3"></VStack>
          <VStack space="5">
            <Text fontWeight="500" fontSize="14" px="5" color="gray.500">
              Menú
            </Text>
            <VStack space="3">
              <Pressable px="5" py="3">
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="home" />}
                  />
                  <Text color="gray.700" fontWeight="500">
                    Inicio
                  </Text>
                </HStack>
              </Pressable>
              <Pressable px="5" py="2">
                <HStack space="7" alignItems="center">
                  <Icon
                    color="gray.500"
                    size="5"
                    as={<MaterialCommunityIcons name="store" />}
                  />
                  <Text color="gray.700" fontWeight="500">
                    Tienda
                  </Text>
                </HStack>
              </Pressable>
            </VStack>
          </VStack>
        </VStack>
        <VStack divider={<Divider />} space="4">
          <VStack space="3"></VStack>
          <VStack space="5">
            <Text fontWeight="500" fontSize="14" px="5" color="gray.500">
              Sistema
            </Text>
            <Pressable px="5" py="3">
              <HStack space="7" alignItems="center">
                <Icon
                  color="gray.500"
                  size="5"
                  as={<Ionicons name="md-person-circle" />}
                />
                <Text fontWeight="500" color="gray.700">
                  Perfil
                </Text>
              </HStack>
            </Pressable>
            <Pressable px="5" py="3">
              <HStack space="7" alignItems="center">
                <Icon
                  color="gray.500"
                  size="5"
                  as={<MaterialCommunityIcons name="book-open" />}
                />
                <Text fontWeight="500" color="gray.700">
                  Preferencias
                </Text>
              </HStack>
            </Pressable>
            <Pressable
              onPress={() => {
                dispatch(DrawerActions.closeDrawer());
                logout({
                  onCompleted: (response) => {
                    if (response.logout.success) {
                      router.push("/");
                    }
                  },
                  onError: () => {},
                  variables: {},
                });
              }}
              px="5"
              py="3"
            >
              <HStack space="7" alignItems="center">
                <Icon
                  color="gray.500"
                  size="5"
                  as={<MaterialCommunityIcons name="logout" />}
                />
                <Text fontWeight="500" color="gray.700">
                  Cerrar Sesión
                </Text>
              </HStack>
            </Pressable>
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
