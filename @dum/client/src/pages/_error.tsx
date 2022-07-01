import Error from "next/error";
import * as React from "react";

function Page({ statusCode }) {
  return <Error statusCode={statusCode} />;
}

Page.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Page;
