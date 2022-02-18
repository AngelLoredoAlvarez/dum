import Router from "next/router";
import * as React from "react";

import Loading from "./Loading";

interface RedirectProps {
  href: string;
}

function Redirect({ href }: RedirectProps) {
  React.useEffect(() => {
    Router.push(href);
  }, [href]);

  return <Loading />;
}

export default Redirect;
