import { createClient } from "graphql-ws";
import { getRelaySerializedState } from "relay-nextjs";
import { withHydrateDatetime } from "relay-nextjs/date";
import {
  Environment,
  Network,
  Observable,
  RecordSource,
  RequestParameters,
  Store,
  Variables,
} from "relay-runtime";

async function fecthQuery(params: RequestParameters, variables: Variables) {
  const response = await fetch("http://localhost:5678/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  const json = await response.text();
  return JSON.parse(json, withHydrateDatetime);
}

function fecthSubscription(
  params: RequestParameters,
  variables: Variables
): Observable<any> {
  const wsClient = createClient({
    url: `${"http://localhost:5678".replace(/^http/, "ws")}/graphql`,
  });

  return Observable.create((sink) =>
    wsClient.subscribe(
      {
        operationName: params.name,
        query: params.text!,
        variables,
      },
      sink as any
    )
  );
}

let clientEnv: Environment | undefined;
export function getClientEnvironment() {
  if (typeof window === "undefined") return null;

  if (clientEnv == null) {
    clientEnv = new Environment({
      network: Network.create(fecthQuery, fecthSubscription),
      store: new Store(new RecordSource(getRelaySerializedState()?.records)),
      isServer: false,
    });
  }

  return clientEnv;
}
