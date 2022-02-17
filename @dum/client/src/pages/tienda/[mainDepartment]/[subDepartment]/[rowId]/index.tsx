import { Image, Pressable, Stack, VStack } from "native-base";
import * as React from "react";
import { usePreloadedQuery } from "react-relay/hooks";
import type { RelayProps } from "relay-nextjs";
import { withRelay } from "relay-nextjs";

import Layout from "../../../../../components/Layout";
import Loading from "../../../../../components/Loading";
import MainDepartmentsList from "../../../../../components/MainDepartmentsList";
import ProductDetails from "../../../../../components/ProductDetails";
import ProductPicture from "../../../../../components/ProductPicture";
import type { ProductPageQuery as ProductPageQueryTypes } from "../../../../../graphql/Queries/__generated__/ProductPageQuery.graphql";
import ProductPageQuery from "../../../../../graphql/Queries/ProductPageQuery";
import { getClientEnvironment } from "../../../../../lib/client";

function ProductPage({
  preloadedQuery,
}: RelayProps<{}, ProductPageQueryTypes>) {
  const productPageQuery = usePreloadedQuery<ProductPageQueryTypes>(
    ProductPageQuery,
    preloadedQuery
  );

  const [pictureId, setPictureId] = React.useState<any>(
    productPageQuery.product.productPictures.edges[0].node.rowId
  );

  const [isMounted, setMounted] = React.useState<boolean>(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Layout currentUser={productPageQuery.currentUser}>
      <VStack h={"100%"} w={"100%"}>
        <MainDepartmentsList departments={productPageQuery} />
        <Stack
          alignContent={"center"}
          alignItems={"center"}
          direction={{
            base: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
            "2xl": "row",
          }}
          flex={1}
          space={1}
        >
          <Stack
            direction={{
              base: "row",
              sm: "row",
              md: "row",
              lg: "column",
              xl: "column",
              "2xl": "column",
            }}
            h={{
              base: "10%",
              sm: "10%",
              md: "12%",
              lg: "100%",
              xl: "100%",
              "2xl": "100%",
            }}
            ml={{
              lg: 10,
              xl: 20,
              "2xl": 48,
            }}
            w={{
              base: "95%",
              sm: "95%",
              md: "97%",
              lg: "10%",
              xl: "10%",
              "2xl": "8%",
            }}
          >
            {productPageQuery.product.productPictures.edges.map(({ node }) => (
              <Pressable
                h={{
                  base: "100%",
                  sm: "100%",
                  md: "100%",
                  lg: "15%",
                  xl: "15%",
                  "2xl": "15%",
                }}
                key={node.id}
                onPress={() => setPictureId(node.rowId)}
                w={{
                  base: "15%",
                  sm: "15%",
                  md: "15%",
                  lg: "100%",
                  xl: "100%",
                  "2xl": "100%",
                }}
              >
                {({ isHovered }) => (
                  <Image
                    alt={node.id}
                    flex={1}
                    source={{ uri: `${node.pictureUrl}` }}
                    style={{
                      transform: [
                        {
                          scale: isHovered ? 1 : 0.96,
                        },
                      ],
                    }}
                  />
                )}
              </Pressable>
            ))}
          </Stack>
          {isMounted ? (
            <React.Suspense fallback={<Loading />}>
              <ProductPicture
                pictureId={pictureId}
                productPicture={productPageQuery}
              />
            </React.Suspense>
          ) : (
            <ProductPicture
              pictureId={pictureId}
              productPicture={productPageQuery}
            />
          )}
          <ProductDetails product={productPageQuery.product} />
        </Stack>
      </VStack>
    </Layout>
  );
}

export default withRelay(ProductPage, ProductPageQuery, {
  createClientEnvironment: () => getClientEnvironment(),
  createServerEnvironment: async (_ctx, { cookies }) => {
    const { createServerEnvironment } = await import(
      "../../../../../lib/server/server"
    );

    return createServerEnvironment(cookies);
  },
  fallback: <Loading />,
  serverSideProps: async (ctx) => {
    const cookies = ctx.req.headers.cookie;

    return { cookies };
  },
});
