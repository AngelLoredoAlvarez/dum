import { Select } from "native-base";
import * as React from "react";
import { useFragment } from "react-relay/hooks";

import type { CurrentUserAddressesFragment_addresses$key } from "../graphql/Fragments/__generated__/CurrentUserAddressesFragment_addresses.graphql";
import CurrentUserAddressesFragment from "../graphql/Fragments/CurrentUserAddressesFragment";

interface CurrentUserAddressesSelectProps {
  addresses: CurrentUserAddressesFragment_addresses$key;
}

function UserAddressesSelect(props: CurrentUserAddressesSelectProps) {
  const { userAddresses } =
    useFragment<CurrentUserAddressesFragment_addresses$key>(
      CurrentUserAddressesFragment,
      props.addresses
    );

  return (
    <Select
      fontSize={{
        base: "sm",
        sm: "md",
        md: "lg",
        lg: "xl",
        xl: "2xl",
        "2xl": "2xl",
      }}
      placeholder={"Elige la dirección a donde enviaremos tu pedido"}
    >
      {userAddresses.edges.map(({ node }) => (
        <Select.Item
          key={node.id}
          label={`COL. ${node.suburb.name}, ${node.town.name}`}
          value={node.rowId}
        />
      ))}
    </Select>
  );
}

export default UserAddressesSelect;
