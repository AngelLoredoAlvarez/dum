import { MaterialIcons } from "@expo/vector-icons";
import {
  HamburgerIcon,
  Hidden,
  HStack,
  Icon,
  Input,
  Link,
  Menu,
  Pressable,
  Stack,
} from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import { MainDepartmentsFragment_mainDepartments$key } from "../graphql/Fragments/__generated__/MainDepartmentsFragment_mainDepartments.graphql";
import MainDepartmentsFragment from "../graphql/Fragments/MainDepartmentsFragment";

interface MainDepartmentsListProps {
  departments: MainDepartmentsFragment_mainDepartments$key;
}

function MainDepartmentsList(props: MainDepartmentsListProps) {
  const { data } = usePaginationFragment(
    MainDepartmentsFragment,
    props.departments
  );

  const router = useRouter();

  return (
    <Stack
      direction={{
        base: "row",
        sm: "row",
        md: "row",
        lg: "column",
        xl: "row",
        "2xl": "row",
      }}
      space={3}
      w={"100%"}
    >
      <HStack
        flex={1}
        ml={{
          base: 3,
          sm: 3,
          md: 3,
          lg: 20,
          xl: 3,
          "2xl": 3,
        }}
        mr={{
          base: 0,
          sm: 0,
          md: 0,
          lg: 20,
          xl: 0,
          "2xl": 0,
        }}
        mt={3}
      >
        <Input
          _focus={{
            borderColor: "yellow.400",
          }}
          autoFocus
          bg="#fff"
          borderRadius="4"
          fontSize="14"
          InputRightElement={
            <Icon
              as={<MaterialIcons name="search" />}
              color="gray.400"
              m="2"
              mr="3"
              size="6"
            />
          }
          placeholder="¿Qué es lo que buscas?"
          px="1"
          py="3"
          w={"100%"}
        />
      </HStack>
      <HStack
        alignContent={"center"}
        alignItems={"center"}
        alignSelf={"center"}
        ml={{
          base: 0,
          sm: 0,
          md: 0,
          lg: 3,
          xl: 0,
          "2xl": 0,
        }}
        mr={3}
        mt={{
          base: 3,
          sm: 3,
          md: 3,
          lg: 0,
          xl: 3,
          "2xl": 3,
        }}
      >
        <Hidden only={["base", "sm", "md"]}>
          <HStack space={4}>
            <Link onPress={() => router.push("/tienda")}>INICIO</Link>
            {data.mainDepartments.edges.map(({ node }) => (
              <Link
                key={node.id}
                onPress={() =>
                  router.push(
                    `/tienda/${node.mainDepartment
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/\s/g, "-")
                      .toLowerCase()}`
                  )
                }
              >
                {node.mainDepartment}
              </Link>
            ))}
          </HStack>
        </Hidden>
        <Hidden only={["lg", "xl", "2xl"]}>
          <Menu
            w="190"
            trigger={(triggerProps) => {
              return (
                <Pressable {...triggerProps}>
                  <HamburgerIcon />
                </Pressable>
              );
            }}
          >
            <Menu.Item onPress={() => router.push("/tienda")}>INICIO</Menu.Item>
            {data.mainDepartments.edges.map(({ node }) => (
              <Menu.Item
                key={node.id}
                onPress={() =>
                  router.push(
                    `/tienda/${node.mainDepartment
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/\s/g, "-")
                      .toLowerCase()}`
                  )
                }
              >
                {node.mainDepartment}
              </Menu.Item>
            ))}
          </Menu>
        </Hidden>
      </HStack>
    </Stack>
  );
}

export default MainDepartmentsList;
