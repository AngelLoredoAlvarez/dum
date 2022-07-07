import { FlatList, Text } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import type { UserAddressesListFragment_userAddresses$key } from "../graphql/Fragments/__generated__/UserAddressesListFragment_userAddresses.graphql";
import UserAddressesListFragment from "../graphql/Fragments/UserAddressesListFragment";

interface UserAddressesListProps {
  userAddresses: UserAddressesListFragment_userAddresses$key;
}

function UserAddressesList(props: UserAddressesListProps) {
  const { data } = usePaginationFragment(
    UserAddressesListFragment,
    props.userAddresses
  );
  return (
    <FlatList
      data={data.userAddresses.edges}
      keyExtractor={(item) => item.node.id}
      renderItem={({ item }) => <Text>{item.node.id}</Text>}
    />
  );
}

export default UserAddressesList;
