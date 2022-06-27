import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
} from "native-base";
import * as React from "react";

function ToastAlert({
  description,
  id,
  isClosable,
  onClose,
  status,
  title,
  variant,
  ...rest
}) {
  return (
    <Alert
      alignSelf={"center"}
      flexDirection={"row"}
      maxWidth={"100%"}
      status={status ?? "info"}
      variant={variant}
      {...rest}
    >
      <VStack flexShrink={1} space={1} w={"100%"}>
        <HStack
          alignItems={"center"}
          flexShrink={1}
          justifyContent={"space-between"}
        >
          <HStack alignItems={"center"} flexShrink={1} space={2}>
            <Alert.Icon />
            <Text
              color={
                variant === "solid"
                  ? "lightText"
                  : variant !== "outline"
                  ? "darkText"
                  : null
              }
              flexShrink={1}
              fontSize={"md"}
              fontWeight={"medium"}
            >
              {title}
            </Text>
          </HStack>
          {isClosable ? (
            <IconButton
              _icon={{
                color: variant === "solid" ? "lightText" : "darkText",
              }}
              icon={<CloseIcon size="3" />}
              onPress={onClose}
              variant={"unstyled"}
            />
          ) : null}
        </HStack>
        <Text
          color={
            variant === "solid"
              ? "lightText"
              : variant !== "outline"
              ? "darkText"
              : null
          }
          px={"6"}
        >
          {description}
        </Text>
      </VStack>
    </Alert>
  );
}

export default ToastAlert;
