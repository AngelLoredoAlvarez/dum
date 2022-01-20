import { Box, Image, Text } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay";

import { PostFragment_post$key } from "../graphql/__generated__/PostFragment_post.graphql";
import PostFragment from "../graphql/PostFragment";

interface PostProps {
  post: PostFragment_post$key;
}

function Post(props: PostProps) {
  const post = useFragment(PostFragment, props.post);

  return (
    <Box flex={1}>
      <Image
        alt={post.headline}
        h={"50%"}
        source={{
          uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
        }}
        w={"100%"}
      />
      <Text
        bold
        borderWidth={1}
        fontSize={{
          base: "2xl",
          sm: "2xl",
          md: "lg",
          lg: "xl",
          xl: "xl",
          "2xl": "7xl",
        }}
        textAlign={"center"}
      >
        {post.headline}
      </Text>
      <Text
        italic
        fontSize={{
          base: "2xl",
          sm: "2xl",
          md: "lg",
          lg: "xl",
          xl: "xl",
          "2xl": "2xl",
        }}
        textAlign={"center"}
      >
        {post.fullDate} ({post.age})
      </Text>
      <Text
        borderWidth={1}
        fontSize={{
          base: "2xl",
          sm: "2xl",
          md: "lg",
          lg: "xl",
          xl: "xl",
          "2xl": "4xl",
        }}
        textAlign={"justify"}
      >
        {post.body}
      </Text>
    </Box>
  );
}

export default Post;
