import { Select } from "native-base";
import * as React from "react";
import { useRefetchableFragment } from "react-relay/hooks";

import type { StreetsFragment_suburbs$key } from "../graphql/Fragments/__generated__/StreetsFragment_suburbs.graphql";
import StreetsFragment from "../graphql/Fragments/StreetsFragment";

interface StreetsListProps {
  selectedValue: string;
  setValue: (field: string, value: string) => void;
  streets: StreetsFragment_suburbs$key;
  suburbId: any;
}

function StreetsList(props: StreetsListProps) {
  const [data, refetch] = useRefetchableFragment(
    StreetsFragment,
    props.streets
  );

  React.useEffect(() => {
    refetch({ suburbId: props.suburbId });
  }, [props.suburbId, refetch]);

  return (
    <Select
      defaultValue={""}
      onValueChange={(value: string) => {
        props.setValue("street", value);
      }}
      placeholder={"Selecciona..."}
      selectedValue={props.selectedValue}
    >
      {data.streetsBySuburbId.edges.map(({ node }) => (
        <Select.Item
          key={node.id}
          label={node.name}
          value={node.rowId.toString()}
        />
      ))}
    </Select>
  );
}

export default StreetsList;
