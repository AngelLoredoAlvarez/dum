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
    <>
      {freeShippingPercentage.percentageFreeShipping === 0 ? null : (
        <VStack
          mb={5}
          space={3}
          w={{
            base: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "40%",
            "2xl": "50%",
          }}
        >
          <Heading
            fontSize={{
              base: "sm",
              sm: "sm",
              md: "md",
              lg: "lg",
              xl: "xl",
              "2xl": "2xl",
            }}
            textAlign={"center"}
          >
            {freeShippingPercentage.percentageFreeShipping === 100
              ? "¡Ya tienes Envío Gratis!"
              : "¡Alcanza el Envío Gratis comprando más productos!"}
          </Heading>
          <Progress
            _dark={{
              background: "white",
            }}
            _light={{
              background: "coolGray.300",
            }}
            colorScheme={"warning"}
            size={"lg"}
            value={freeShippingPercentage.percentageFreeShipping}
          />
          {freeShippingPercentage.amountToReachFreeShipping === "0.00" ? (
            <Text
              fontSize={{
                base: "sm",
                sm: "sm",
                md: "md",
                lg: "lg",
                xl: "xl",
                "2xl": "2xl",
              }}
              textAlign={"center"}
            >
              ¡Enviaremos todo directamente desde nuestra bodega!
            </Text>
          ) : (
            <Text
              fontSize={{
                base: "sm",
                sm: "sm",
                md: "md",
                lg: "lg",
                xl: "xl",
                "2xl": "2xl",
              }}
              textAlign={"center"}
            >
              Agrega{" "}
              <Text
                bold
                fontSize={{
                  base: "sm",
                  sm: "sm",
                  md: "md",
                  lg: "lg",
                  xl: "xl",
                  "2xl": "2xl",
                }}
              >
                $ {freeShippingPercentage.amountToReachFreeShipping}
              </Text>{" "}
              en productos.
            </Text>
          )}
        </VStack>
      )}
    </>
  );
}

export default FreeShippingProgress;
