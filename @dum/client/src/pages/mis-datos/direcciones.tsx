import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import Redirect from "../../components/Redirect";
import UserAddressesList from "../../components/UserAddressesList";
import type { UserAddressesPageQuery as UserAddressesPageQueryTypes } from "../../graphql/Queries/__generated__/UserAddressesPageQuery.graphql";
import UserAddressesPageQuery from "../../graphql/Queries/UserAddressesPageQuery";
import { getClientEnvironment } from "../../lib/client";

function UserAddressesPage({
  preloadedQuery,
}: RelayProps<{}, UserAddressesPageQueryTypes>) {
  const userAddressesPageQuery = usePreloadedQuery<UserAddressesPageQueryTypes>(
    UserAddressesPageQuery,
    preloadedQuery
  );

  if (
    userAddressesPageQuery.currentUser === null ||
    userAddressesPageQuery.currentUser === undefined
  )
    return <Redirect href="/" />;

  return (
    <Layout currentUser={userAddressesPageQuery}>
      <UserAddressesList userAddresses={userAddressesPageQuery.currentUser} />
    </Layout>
  );
}

export default withRelay(UserAddressesPage, UserAddressesPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import("../../lib/server/server");

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
