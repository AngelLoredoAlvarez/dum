import { Box, Heading, HStack, Image, Link, Stack, Text } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import { PostFragment_post$key } from "../graphql/__generated__/PostFragment_post.graphql";
import PostFragment from "../graphql/PostFragment";

interface PostListItemProps {
  post: PostFragment_post$key;
}

function PostListItem(props: PostListItemProps) {
  const post = useFragment(PostFragment, props.post);

  return (
    <Stack
      _dark={{ backgroundColor: "gray.700" }}
      _light={{ backgroundColor: "coolGray.50" }}
      direction={{
        base: "column",
        sm: "column",
        md: "row",
        lg: "row",
        xl: "row",
        "2xl": "row",
      }}
      mb="2"
      ml={{
        base: "3",
        sm: "3",
        md: "12",
        lg: "20",
        xl: "40",
        "2xl": "64",
      }}
      mr={{
        base: "3",
        sm: "3",
        md: "12",
        lg: "20",
        xl: "40",
        "2xl": "64",
      }}
      mt="2"
      overflow="hidden"
      rounded="lg"
      shadow="1"
    >
      <Box>
        <Image
          alt="image"
          h={{
            base: "40",
            sm: "40",
            md: "215px",
            lg: "215px",
            xl: "215px",
            "2xl": "215px",
          }}
          w={{
            base: "100%",
            sm: "100%",
            md: "250px",
            lg: "250px",
            xl: "250px",
            "2xl": "250px",
          }}
          source={{
            uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
          }}
        />
      </Box>
      <Stack flex={1} p="4" space={[3, 3, 1.5]}>
        <Heading size={["md", "lg", "lg"]}>{post.headline}</Heading>
        <Text
          fontSize={{
            base: "sm",
            sm: "sm",
            md: "sm",
            lg: "lg",
            xl: "lg",
            "2xl": "lg",
          }}
          noOfLines={3}
          textAlign={"justify"}
        >
          {post.body}
        </Text>
        <Link href="#">Leer más...</Link>
        <HStack
          alignItems="center"
          flex={1}
          justifyContent="space-between"
          space="4"
        >
          <HStack alignItems="center">
            <Text
              color="coolGray.600"
              _dark={{ color: "warmGray.200" }}
              fontSize={{
                base: "sm",
                sm: "sm",
                md: "sm",
                lg: "md",
                xl: "md",
                "2xl": "md",
              }}
            >
              Publicado el {post.date}
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Stack>
  );
}

export default PostListItem;
