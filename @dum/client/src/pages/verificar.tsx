import { Center } from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { useMutation, usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Alert from "../components/Alert";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Redirect from "../components/Redirect";
import type { VerifyEmailMutation as VerifyEmailMutationTypes } from "../graphql/Mutations/__generated__/VerifyEmailMutation.graphql";
import VerifyEmailMutation from "../graphql/Mutations/VerifyEmailMutation";
import type { VerifyPageQuery as VerifyPageQueryTypes } from "../graphql/Queries/__generated__/VerifyPageQuery.graphql";
import VerifyPageQuery from "../graphql/Queries/VerifyPageQuery";
import { getClientEnvironment } from "../lib/client";

function VerifyPage({ preloadedQuery }: RelayProps<{}, VerifyPageQueryTypes>) {
  const verifyPageQuery = usePreloadedQuery<VerifyPageQueryTypes>(
    VerifyPageQuery,
    preloadedQuery
  );

  const [verificated, setVerificated] = React.useState<boolean>(true);

  const router = useRouter();

  const [verifyEmail] =
    useMutation<VerifyEmailMutationTypes>(VerifyEmailMutation);

  React.useEffect(() => {
    const { id, token } = router.query;
    if (
      (id !== null && token !== null) ||
      (id !== undefined && token !== undefined)
    ) {
      verifyEmail({
        onCompleted: (response) => {
          if (response.verifyEmail) {
            if (response.verifyEmail.success) setVerificated(true);
            else setVerificated(false);
          }
        },
        onError: (err) => {
          console.log(err);
        },
        variables: {
          VerifyInput: {
            userEmailId: `${id}`,
            token: `${token}`,
          },
        },
      });
    }
  }, [router.query, router.query.id, router.query.token, verifyEmail]);

  if (
    (router.query.id === null && router.query.token === null) ||
    (router.query.id === undefined && router.query.token === undefined)
  )
    return <Redirect href="/" />;

  return (
    <Layout currentUser={verifyPageQuery}>
      <Center flex={1}>
        <Alert
          message={
            verificated
              ? "Gracias por verificar tu cuenta, puedes cerrar esta pestaña. 👌"
              : "No fue posible Verificar tu Cuenta 😔, intentalo nuevamente o ponte en contacto con Soporte Técnico 👍🏻."
          }
          status={verificated ? "success" : "error"}
          title={
            verificated
              ? "¡Cuenta Verificada! 👏"
              : "Error al Verificar la Cuenta 😵"
          }
        />
      </Center>
    </Layout>
  );
}

export default withRelay(VerifyPage, VerifyPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import("../lib/server/server");

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
