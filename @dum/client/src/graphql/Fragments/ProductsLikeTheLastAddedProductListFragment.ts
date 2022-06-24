import graphql from "babel-plugin-relay/macro";

export default graphql`
  fragment ProductsLikeTheLastAddedProductListFragment_productsLikeTheLastAddedProductList on Query
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }
    after: { type: "Cursor" }
  )
  @refetchable(queryName: "ProductsLikeTheLastAddedProduct") {
    productsLikeTheLastAddedProduct(first: $first, after: $after)
      @connection(
        key: "ProductsLikeTheLastAddedProductListFragment_productsLikeTheLastAddedProduct"
      ) {
      edges {
        node {
          id
          ...ProductLikeTheLastAddedProductFragment_productLikeTheLastAddedProduct
        }
      }
    }
  }
`;
