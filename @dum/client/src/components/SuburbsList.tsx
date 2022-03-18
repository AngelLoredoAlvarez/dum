import { Input, Popover, Pressable, ScrollView, Text } from "native-base";
import * as React from "react";
import { useRefetchableFragment } from "react-relay/hooks";

import type { SuburbsFragment_suburbs$key } from "../graphql/Fragments/__generated__/SuburbsFragment_suburbs.graphql";
import SuburbsFragment from "../graphql/Fragments/SuburbsFragment";

interface SuburbsListProps {
  suburbs: SuburbsFragment_suburbs$key;
  townId: any;
}

function SuburbsList(props: SuburbsListProps) {
  const [data, refetch] = useRefetchableFragment(
    SuburbsFragment,
    props.suburbs
  );

  React.useEffect(() => {
    refetch({ townId: props.townId });
  }, [props.townId, refetch]);

  return (
    <Popover
      trigger={(triggerProps) => (
        <Pressable {...triggerProps}>
          <Input
            _focus={{
              borderColor: "yellow.400",
            }}
            autoComplete={"off"}
            placeholder={"Buscar..."}
          />
        </Pressable>
      )}
    >
      <Popover.Content>
        <Popover.Arrow />
        <Popover.Body>
          <ScrollView maxW="300" h="80">
            {data.suburbsByTownId.edges.map(({ node }) => (
              <Text key={node.id}>{node.name}</Text>
            ))}
          </ScrollView>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}

export default SuburbsList;
