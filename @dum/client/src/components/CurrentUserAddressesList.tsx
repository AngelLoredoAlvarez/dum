import { FlatList } from "native-base";
import * as React from "react";
import { usePaginationFragment } from "react-relay/hooks";

import type { CurrentUserAddressesListFragment_currentUserAddresses$key } from "../graphql/Fragments/__generated__/CurrentUserAddressesListFragment_currentUserAddresses.graphql";
import type { CurrentUserFullMainAddressFragment_currentUserFullMainAddress$key } from "../graphql/Fragments/__generated__/CurrentUserFullMainAddressFragment_currentUserFullMainAddress.graphql";
import UserAddressesListFragment from "../graphql/Fragments/CurrentUserAddressesListFragment";
import CurrentUserAddressesListHeader from "./CurrentUserAddressesListHeader";
import CurrentUserAddressesListItem from "./CurrentUserAddressesListItem";
import Loading from "./Loading";

interface UserAddressesListProps {
  userAddresses: CurrentUserAddressesListFragment_currentUserAddresses$key;
  currentUserFullMainAddress: CurrentUserFullMainAddressFragment_currentUserFullMainAddress$key;
}

function UserAddressesList(props: UserAddressesListProps) {
  const { data, isLoadingNext, hasNext, loadNext } = usePaginationFragment(
    UserAddressesListFragment,
    props.userAddresses
  );
  return (
    <FlatList
      data={data.userAddresses.edges}
      ListFooterComponent={hasNext && (isLoadingNext ? <Loading /> : null)}
      ListHeaderComponent={
        <CurrentUserAddressesListHeader
          fullMainAddress={props.currentUserFullMainAddress}
        />
      }
      keyExtractor={(item) => item.node.id}
      onEndReached={() => {
        loadNext(5);
      }}
      onEndReachedThreshold={0}
      renderItem={({ item }) => (
        <CurrentUserAddressesListItem fullAddress={item.node} />
      )}
    />
  );
}

export default UserAddressesList;
