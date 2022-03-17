import { FlatList, Text } from "native-base";
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
    <FlatList
      data={data.suburbsBySearch.edges}
      keyExtractor={(item) => item.node.id}
      renderItem={({ item }) => <Text>{item.node.name}</Text>}
      ListEmptyComponent={<Text>No hay nada para mostrar</Text>}
    />
  );
}

export default SuburbsList;
