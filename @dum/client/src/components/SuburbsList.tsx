import { Pressable, ScrollView, Text, VStack } from "native-base";
import * as React from "react";
import { useRefetchableFragment } from "react-relay/hooks";

import type { SuburbsFragment_suburbs$key } from "../graphql/Fragments/__generated__/SuburbsFragment_suburbs.graphql";
import SuburbsFragment from "../graphql/Fragments/SuburbsFragment";

interface SuburbsListProps {
  search: string;
  suburbs: SuburbsFragment_suburbs$key;
  townId: any;
}

function SuburbsList(props: SuburbsListProps) {
  const [data, refetch] = useRefetchableFragment(
    SuburbsFragment,
    props.suburbs
  );

  React.useEffect(() => {
    refetch({ townId: props.townId, search: props.search });
  }, [props.search, props.townId, refetch]);

  return (
    <VStack h={"1%"} w={"100%"}>
      <ScrollView borderWidth={1}>
        {data.suburbsBySearch.edges.map(({ node }) => (
          <Pressable key={node.id}>
            <Text>{node.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </VStack>
  );
}

export default SuburbsList;
