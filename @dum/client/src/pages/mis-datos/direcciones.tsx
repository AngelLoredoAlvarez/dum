import * as React from "react";
import { usePreloadedQuery } from "react-relay";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import UserAddressesList from "../../components/CurrentUserAddressesList";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import Redirect from "../../components/Redirect";
import type { CurrentUserAddressesPageQuery as UserAddressesPageQueryTypes } from "../../graphql/Queries/__generated__/CurrentUserAddressesPageQuery.graphql";
import UserAddressesPageQuery from "../../graphql/Queries/CurrentUserAddressesPageQuery";
import { getClientEnvironment } from "../../lib/client";

function UserAddressesPage({
  preloadedQuery,
}: RelayProps<{}, UserAddressesPageQueryTypes>) {
  const currentUserAddressesPageQuery =
    usePreloadedQuery<UserAddressesPageQueryTypes>(
      UserAddressesPageQuery,
      preloadedQuery
    );

  if (
    currentUserAddressesPageQuery.currentUser === null ||
    currentUserAddressesPageQuery.currentUser === undefined
  )
    return <Redirect href="/" />;

  return (
    <Layout currentUser={currentUserAddressesPageQuery}>
      <UserAddressesList
        currentUserFullMainAddress={currentUserAddressesPageQuery.currentUser}
        userAddresses={currentUserAddressesPageQuery.currentUser}
      />
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
