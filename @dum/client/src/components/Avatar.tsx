import { Avatar as NBAvatar } from "native-base";
import * as React from "react";

interface AvatarProps {
  imageURI?: string;
  isHovered?: boolean;
  size: string;
  text?: string;
}

function Avatar(props: AvatarProps) {
  return (
    <NBAvatar
      _dark={{
        bg: "coolGray.800",
      }}
      _light={{
        bg: "red.700",
      }}
      alignSelf="center"
      size={props.size}
      source={{
        uri: props.imageURI,
      }}
      style={{
        transform: [
          {
            scale: props.isHovered ? 1 : 0.96,
          },
        ],
      }}
    >
      {props.text}
    </NBAvatar>
  );
}

export default Avatar;
