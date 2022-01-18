import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  Badge,
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Link,
  Pressable,
  StatusBar,
  Text,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { CurrentUserFragment_user$key } from "../graphql/__generated__/CurrentUserFragment_user.graphql";
import CurrentUserFragment from "../graphql/CurrentUserFragment";
import CustomDrawerContent from "./CustomDrawerContent";
import Redirect from "./Redirect";

const Drawer = createDrawerNavigator();

interface LayoutProps {
  children?: React.ReactNode;
  currentUser: CurrentUserFragment_user$key;
}

function Layout(props: LayoutProps) {
  const screenSize = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

  const { colorMode, toggleColorMode } = useColorMode();

  const router = useRouter();

  const currentUser = useFragment(CurrentUserFragment, props.currentUser);

  if (router.pathname === "/login" && currentUser) return <Redirect href="/" />;

  return (
    <Box flex={1}>
      <StatusBar barStyle="light-content" />
      <Box safeAreaTop />
      <HStack
        _dark={{
          bg: "coolGray.800",
        }}
        _light={{
          bg: "red.700",
        }}
        alignItems="center"
        justifyContent="space-between"
        px="1"
        py="1"
      >
        <HStack alignItems="center" space={3}>
          <Text color={"white"} fontSize={"lg"}>
            Desarrollos Urbanos Montecristo
          </Text>
          <IconButton
            _hover={{
              bg: "muted",
            }}
            _pressed={{
              bg: "muted",
            }}
            borderRadius="full"
            icon={
              <Icon
                as={
                  <Ionicons name={colorMode === "light" ? "sunny" : "moon"} />
                }
                color="white"
                size="sm"
              />
            }
            onPress={toggleColorMode}
          />
        </HStack>
        <HStack alignItems="center" space={2}>
          <VStack>
            <Badge
              _text={{
                fontSize: 12,
              }}
              alignSelf="flex-end"
              bg="amber.600"
              mb={-4}
              rounded="999px"
              variant="solid"
              zIndex={1}
            >
              0
            </Badge>
            <IconButton
              _hover={{
                bg: "muted",
              }}
              _pressed={{
                bg: "muted",
              }}
              icon={
                <Icon as={<Ionicons name="cart" />} size="sm" color="white" />
              }
              mr={2}
            />
          </VStack>
          {!currentUser &&
          router.pathname !== "/login" &&
          (screenSize === "base" || screenSize === "sm") ? (
            <IconButton
              _hover={{
                bg: "muted",
              }}
              _pressed={{
                bg: "muted",
              }}
              icon={
                <Icon
                  as={<MaterialCommunityIcons name="login" />}
                  size="sm"
                  color="white"
                />
              }
              mr={2}
              onPress={() => router.push("/login")}
            />
          ) : null}
          {!currentUser &&
          router.pathname !== "/login" &&
          (screenSize === "md" ||
            screenSize === "lg" ||
            screenSize === "xl" ||
            screenSize === "2xl") ? (
            <Link
              _text={{ color: "white" }}
              onPress={() => router.push("/login")}
            >
              Iniciar Sesión
            </Link>
          ) : null}
        </HStack>
      </HStack>
      <Box
        _dark={{ bg: "coolGray.600" }}
        _light={{ bg: "warmGray.50" }}
        flex={1}
      >
        {props.children}
      </Box>
      {router.pathname !== "/login" ? (
        <HStack
          _dark={{
            bg: "coolGray.800",
          }}
          _light={{
            bg: "red.700",
          }}
          alignItems="center"
          safeAreaBottom
          shadow={6}
        >
          <Pressable
            cursor="pointer"
            opacity={router.pathname === "/" ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => router.push("/")}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={router.pathname === "/" ? "home" : "home-outline"}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Home
              </Text>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            flex={1}
            opacity={router.pathname === "/tienda" ? 1 : 0.6}
            onPress={() => router.push("/tienda")}
            py="2"
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={
                      router.pathname === "/tienda" ? "cart" : "cart-outline"
                    }
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Tienda
              </Text>
            </Center>
          </Pressable>
        </HStack>
      ) : null}
    </Box>
  );
}

function DrawerNavigator(props: LayoutProps) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={() => (
          <CustomDrawerContent currentUser={props.currentUser} />
        )}
        screenOptions={{ headerShown: false }}
      >
        <Drawer.Screen name="Desarrollos Urbanos Montecristo">
          {() => (
            <Layout currentUser={props.currentUser}>{props.children}</Layout>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigator;
