import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from "@react-navigation/native";
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
  Tooltip,
  useBreakpointValue,
  useColorMode,
  VStack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { CurrentUserFragment_user$key } from "../graphql/Fragments/__generated__/CurrentUserFragment_user.graphql";
import CurrentUserFragment from "../graphql/Fragments/CurrentUserFragment";
import Avatar from "./Avatar";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

interface LayoutProps {
  children?: React.ReactNode;
  currentUser: CurrentUserFragment_user$key;
}

function Layout(props: LayoutProps) {
  const router = useRouter();

  const currentUrl = router.asPath;

  const { currentUser } = useFragment(CurrentUserFragment, props.currentUser);

  const { dispatch } = useNavigation();

  const { colorMode, toggleColorMode } = useColorMode();

  const screenSize = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
    "2xl": "2xl",
  });

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
          {currentUser ? (
            <Pressable onPress={() => dispatch(DrawerActions.toggleDrawer())}>
              {({ isHovered }) => (
                <Avatar
                  imageURI={require("../../public/Logo_Montecristo_Color.png")}
                  isHovered={isHovered}
                  size="md"
                />
              )}
            </Pressable>
          ) : (
            <Avatar
              imageURI={require("../../public/Logo_Montecristo_Color.png")}
              size="md"
            />
          )}
          <Text
            color={"white"}
            fontSize={{
              base: "sm",
              sm: "md",
              md: "lg",
              lg: "lg",
              xl: "lg",
              "2xl": "lg",
            }}
            onPress={() => router.push("/")}
          >
            Desarrollos Urbanos Montecristo
          </Text>
          <Text>{screenSize}</Text>
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
          {currentUser ? (
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
                {currentUser.shoppingListProductsCount}
              </Badge>
              <Tooltip label="Ver carrito">
                <IconButton
                  _hover={{
                    bg: "muted",
                  }}
                  _pressed={{
                    bg: "muted",
                  }}
                  icon={
                    <Icon
                      as={<Ionicons name="cart" />}
                      size="sm"
                      color="white"
                    />
                  }
                  mr={2}
                  onPress={() => router.push("/carrito")}
                />
              </Tooltip>
            </VStack>
          ) : null}
          {!currentUser &&
          !router.pathname.includes("/login") &&
          !router.pathname.includes("/registrate") &&
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
              onPress={() =>
                router.push(`/login?next=${encodeURIComponent(currentUrl)}`)
              }
            />
          ) : null}
          {!currentUser &&
          !router.pathname.includes("/login") &&
          !router.pathname.includes("/registrate") &&
          (screenSize === "md" ||
            screenSize === "lg" ||
            screenSize === "xl" ||
            screenSize === "2xl") ? (
            <Link
              _text={{ color: "white" }}
              onPress={() =>
                router.push(`/login?next=${encodeURIComponent(currentUrl)}`)
              }
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
        <Box flex={1}>{props.children}</Box>
      </Box>
      {!router.pathname.includes("/login") &&
      !router.pathname.includes("/blog") &&
      !router.pathname.includes("/registrate") ? (
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
            opacity={router.pathname.includes("/tienda") ? 1 : 0.6}
            onPress={() => router.push("/tienda")}
            py="2"
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={
                      router.pathname.includes("/tienda")
                        ? "store"
                        : "store-outline"
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
          {currentUser !== null ? (
            <Pressable
              cursor="pointer"
              flex={1}
              opacity={router.pathname.includes("/carrito") ? 1 : 0.6}
              onPress={() => router.push("/carrito")}
              py="2"
            >
              <Center>
                <Icon
                  mb="1"
                  as={
                    <MaterialCommunityIcons
                      name={
                        router.pathname.includes("/carrito")
                          ? "cart"
                          : "cart-outline"
                      }
                    />
                  }
                  color="white"
                  size="sm"
                />
                <Text color="white" fontSize="12">
                  Carrito
                </Text>
              </Center>
            </Pressable>
          ) : null}
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
