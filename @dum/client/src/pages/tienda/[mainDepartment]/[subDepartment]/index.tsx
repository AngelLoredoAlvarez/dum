import { Hidden } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../../../components/Layout";
import Loading from "../../../../components/Loading";
import SubDepartmentProductsList from "../../../../components/SubDepartmentProductsList";
import type { SubDepartmentPageQuery as SubDepartmentPageQueryTypes } from "../../../../graphql/Queries/__generated__/SubDepartmentPageQuery.graphql";
import SubDepartmentPageQuery from "../../../../graphql/Queries/SubDepartmentPageQuery";
import { getClientEnvironment } from "../../../../lib/client";

function SubDepartmentPage({
  preloadedQuery,
}: RelayProps<{}, SubDepartmentPageQueryTypes>) {
  const subDepartmentPageQuery = usePreloadedQuery<SubDepartmentPageQueryTypes>(
    SubDepartmentPageQuery,
    preloadedQuery
  );

  return (
    <Layout currentUser={subDepartmentPageQuery}>
      <Hidden only={["base", "sm", "md", "lg"]}>
        <SubDepartmentProductsList
          amountOfItemsToFetch={5}
          mainDepartments={subDepartmentPageQuery}
          numberOfColumns={5}
          products={subDepartmentPageQuery.subDepartmentByName}
          subDepartment={subDepartmentPageQuery.subDepartmentByName}
        />
      </Hidden>
      <Hidden only={["base", "sm", "md", "xl", "2xl"]}>
        <SubDepartmentProductsList
          amountOfItemsToFetch={4}
          mainDepartments={subDepartmentPageQuery}
          numberOfColumns={4}
          products={subDepartmentPageQuery.subDepartmentByName}
          subDepartment={subDepartmentPageQuery.subDepartmentByName}
        />
      </Hidden>
      <Hidden only={["base", "sm", "lg", "xl", "2xl"]}>
        <SubDepartmentProductsList
          amountOfItemsToFetch={3}
          mainDepartments={subDepartmentPageQuery}
          numberOfColumns={3}
          products={subDepartmentPageQuery.subDepartmentByName}
          subDepartment={subDepartmentPageQuery.subDepartmentByName}
        />
      </Hidden>
      <Hidden only={["base", "md", "lg", "xl", "2xl"]}>
        <SubDepartmentProductsList
          amountOfItemsToFetch={2}
          mainDepartments={subDepartmentPageQuery}
          numberOfColumns={2}
          products={subDepartmentPageQuery.subDepartmentByName}
          subDepartment={subDepartmentPageQuery.subDepartmentByName}
        />
      </Hidden>
    </Layout>
  );
}

export default withRelay(SubDepartmentPage, SubDepartmentPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import(
      "../../../../lib/server/server"
    );

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
