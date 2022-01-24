import { Box, Image, Text } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay";

import { PostFragment_post$key } from "../graphql/Fragments/__generated__/PostFragment_post.graphql";
import PostFragment from "../graphql/Fragments/PostFragment";

interface PostProps {
  post: PostFragment_post$key;
}

function Post(props: PostProps) {
  const post = useFragment(PostFragment, props.post);

  return (
    <Box flex={1}>
      <Image
        alt={post.headline}
        h={"45%"}
        mb={3}
        ml={{
          base: 3,
          sm: 3,
          md: 20,
          lg: 32,
          xl: 48,
          "2xl": 56,
        }}
        mr={{
          base: 3,
          sm: 3,
          md: 20,
          lg: 32,
          xl: 48,
          "2xl": 56,
        }}
        mt={3}
        rounded={"lg"}
        source={{
          uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
        }}
      />
      <Text
        bold
        fontSize={{
          base: "2xl",
          sm: "2xl",
          md: "2xl",
          lg: "4xl",
          xl: "4xl",
          "2xl": "6xl",
        }}
        mb={3}
        ml={{
          base: 3,
          sm: 3,
          md: 20,
          lg: 32,
          xl: 48,
          "2xl": 56,
        }}
        mr={{
          base: 3,
          sm: 3,
          md: 20,
          lg: 32,
          xl: 48,
          "2xl": 56,
        }}
        textAlign={"center"}
      >
        {post.headline}
      </Text>
      <Text
        fontSize={{
          base: "md",
          sm: "md",
          md: "lg",
          lg: "xl",
          xl: "xl",
          "2xl": "2xl",
        }}
        italic
        mb={3}
        ml={{
          base: 3,
          sm: 3,
          md: 20,
          lg: 32,
          xl: 48,
          "2xl": 56,
        }}
        mr={{
          base: 3,
          sm: 3,
          md: 20,
          lg: 32,
          xl: 48,
          "2xl": 56,
        }}
        textAlign={"center"}
      >
        {post.fullDate} ({post.age})
      </Text>
      <Text
        fontSize={{
          base: "md",
          sm: "md",
          md: "lg",
          lg: "xl",
          xl: "xl",
          "2xl": "2xl",
        }}
        ml={{
          base: 3,
          sm: 3,
          md: 20,
          lg: 32,
          xl: 48,
          "2xl": 56,
        }}
        mr={{
          base: 3,
          sm: 3,
          md: 20,
          lg: 32,
          xl: 48,
          "2xl": 56,
        }}
        textAlign={"justify"}
      >
        {post.body}
      </Text>
    </Box>
  );
}

export default Post;
