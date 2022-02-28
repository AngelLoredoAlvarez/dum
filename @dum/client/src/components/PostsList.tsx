import { FlatList } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import { PostsFragment_posts$key } from "../graphql/Fragments/__generated__/PostsFragment_posts.graphql";
import PostsFragment from "../graphql/Fragments/PostsFragment";
import PostListItem from "./PostListItem";
import PostsListHeader from "./PostsListHeader";

interface PostsListProps {
  posts: PostsFragment_posts$key;
}

function PostsList(props: PostsListProps) {
  const { data } = usePaginationFragment(PostsFragment, props.posts);

  return (
    <FlatList
      data={data.posts.edges}
      ListHeaderComponent={PostsListHeader}
      keyExtractor={(item) => item.node.id}
      renderItem={({ item }) => <PostListItem post={item.node} />}
    />
  );
}

export default PostsList;
