import { Container, Text } from "native-base";
import Router from "next/router";
import * as React from "react";

interface RedirectProps {
  href: string;
}

function Redirect({ href }: RedirectProps) {
  React.useEffect(() => {
    Router.push(href);
  }, [href]);

  return (
    <Container>
      <Text>Redirecting...</Text>
    </Container>
  );
}

export default Redirect;
