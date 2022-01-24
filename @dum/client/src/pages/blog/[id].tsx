import { HStack, Link } from "native-base";
import { useRouter } from "next/router";
import * as React from "react";
import { usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import type { PostPageQuery as PostPageQueryTypes } from "../../graphql/Queries/__generated__/PostPageQuery.graphql";
import PostPageQuery from "../../graphql/Queries/PostPageQuery";
import { getClientEnvironment } from "../../lib/client";

function PostPage({ preloadedQuery }: RelayProps<{}, PostPageQueryTypes>) {
  const postPageQuery = usePreloadedQuery(PostPageQuery, preloadedQuery);

  const router = useRouter();

  return (
    <Layout currentUser={postPageQuery.currentUser}>
      <HStack w={"100%"}>
        <Link ml={3} mt={2} onPress={() => router.push("/")}>
          Regresar...
        </Link>
      </HStack>
      <Post post={postPageQuery.post} />
    </Layout>
  );
}

export default withRelay(PostPage, PostPageQuery, {
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
