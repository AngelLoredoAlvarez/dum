import { withHydrateDatetime } from "relay-nextjs/date";
import {
  Environment,
  Network,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";

export function createServerEnvironment(cookie) {
  const fetchFunction = async (
    params: RequestParameters,
    variables: Variables
  ) => {
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
  };

  return new Environment({
    network: Network.create(fetchFunction),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
