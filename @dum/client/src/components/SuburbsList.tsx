import { Select } from "native-base";
import * as React from "react";
import { useRefetchableFragment } from "react-relay/hooks";

import type { SuburbsFragment_suburbs$key } from "../graphql/Fragments/__generated__/SuburbsFragment_suburbs.graphql";
import SuburbsFragment from "../graphql/Fragments/SuburbsFragment";

interface SuburbsListProps {
  selectedValue: string;
  setSuburbId: (suburbId: any) => void;
  setValue: (field: string, value: string) => void;
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
    <Select
      defaultValue={""}
      onValueChange={(value: string) => {
        props.setValue("suburb", value);
        props.setSuburbId(value);
      }}
      placeholder={"Selecciona..."}
      selectedValue={props.selectedValue}
    >
      {data.suburbsByTownId.edges.map(({ node }) => (
        <Select.Item
          key={node.id}
          label={node.name}
          value={node.rowId.toString()}
        />
      ))}
    </Select>
  );
}

export default SuburbsList;
