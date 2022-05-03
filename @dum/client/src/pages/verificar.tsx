import { Text } from "native-base";
import { useRouter } from "next/router";
import * as React from "react";

function VerifyPage(props) {
  const router = useRouter();
  console.log("useRouter(): ", router.query);

  return (
    <>
      <Text>{props.id}</Text>
      <Text>{props.token}</Text>
    </>
  );
}

export default VerifyPage;
