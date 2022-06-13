import { Heading, Progress, Text, VStack } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { FreeShippingPercentageFragment_freeShippingPercentage$key } from "../graphql/Fragments/__generated__/FreeShippingPercentageFragment_freeShippingPercentage.graphql";
import FreeShippingPercentageFragment from "../graphql/Fragments/FreeShippingPercentageFragment";

interface FreeShippingPercentageProps {
  freeShippingPercentage: FreeShippingPercentageFragment_freeShippingPercentage$key;
}

function FreeShippingProgress(props: FreeShippingPercentageProps) {
  const freeShippingPercentage =
    useFragment<FreeShippingPercentageFragment_freeShippingPercentage$key>(
      FreeShippingPercentageFragment,
      props.freeShippingPercentage
    );

  return (
    <VStack space={3} w={"100%"}>
      <Heading
        fontSize={{
          base: "sm",
          sm: "sm",
          md: "sm",
          lg: "md",
          xl: "lg",
          "2xl": "xl",
        }}
        textAlign={"center"}
      >
        {freeShippingPercentage.currentUserOpenedShoppingList
          .percentageFreeShipping === 100
          ? "¡Ya tienes Envío Gratis!"
          : "¡Alcanza el Envío Gratis comprando más productos!"}
      </Heading>
      <Progress
        colorScheme={"warning"}
        size={"lg"}
        value={
          freeShippingPercentage.currentUserOpenedShoppingList
            .percentageFreeShipping
        }
      />
      <Text
        fontSize={{
          base: "sm",
          sm: "sm",
          md: "sm",
          lg: "md",
          xl: "lg",
          "2xl": "xl",
        }}
        textAlign={"center"}
      >
        Agrega{" "}
        <Text
          bold
          fontSize={{
            base: "sm",
            sm: "sm",
            md: "sm",
            lg: "md",
            xl: "lg",
            "2xl": "xl",
          }}
        >
          $ 0.00
        </Text>{" "}
        en productos.
      </Text>
    </VStack>
  );
}

export default FreeShippingProgress;
