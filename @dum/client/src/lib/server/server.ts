import { withHydrateDatetime } from "relay-nextjs/date";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

export function createServerNetwork(cookie) {
  return Network.create(async (params, variables) => {
    const response = await fetch("http://localhost:5678/graphql", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
      },
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
    });

    const json = await response.text();
    return JSON.parse(json, withHydrateDatetime);
  });
}

export function createServerEnvironment(cookie) {
  return new Environment({
    network: createServerNetwork(cookie),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
