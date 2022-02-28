import { Heading } from "native-base";
import * as React from "react";

function PostsListHeader() {
  return (
    <Heading
      fontSize={{
        base: "md",
        sm: "lg",
        md: "xl",
        lg: "2xl",
        xl: "4xl",
        "2xl": "6xl",
      }}
      textAlign={"center"}
    >
      ¡LAS NOTICIAS!
    </Heading>
  );
}

export default PostsListHeader;
