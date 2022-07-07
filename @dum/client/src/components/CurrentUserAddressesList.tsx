import { FlatList, Text } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import type { CurrentUserAddressesListFragment_currentUserAddresses$key } from "../graphql/Fragments/__generated__/CurrentUserAddressesListFragment_currentUserAddresses.graphql";
import type { CurrentUserFullMainAddressFragment_currentUserFullMainAddress$key } from "../graphql/Fragments/__generated__/CurrentUserFullMainAddressFragment_currentUserFullMainAddress.graphql";
import UserAddressesListFragment from "../graphql/Fragments/CurrentUserAddressesListFragment";
import CurrentUserAddressesListHeader from "./CurrentUserAddressesListHeader";

interface UserAddressesListProps {
  userAddresses: CurrentUserAddressesListFragment_currentUserAddresses$key;
  currentUserFullMainAddress: CurrentUserFullMainAddressFragment_currentUserFullMainAddress$key;
}

function UserAddressesList(props: UserAddressesListProps) {
  const { data } = usePaginationFragment(
    UserAddressesListFragment,
    props.userAddresses
  );
  return (
    <FlatList
      data={data.userAddresses.edges}
      ListHeaderComponent={
        <CurrentUserAddressesListHeader
          fullMainAddress={props.currentUserFullMainAddress}
        />
      }
      keyExtractor={(item) => item.node.id}
      renderItem={({ item }) => <Text>{item.node.id}</Text>}
    />
  );
}

export default UserAddressesList;
