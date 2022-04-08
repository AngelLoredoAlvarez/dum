import "setimmediate";
import "../styles/nprogress.css";
import "raf/polyfill";
// @ts-ignore
global.setImmediate = requestAnimationFrame;

import { SSRProvider } from "@react-aria/ssr";
import { ColorMode, NativeBaseProvider, StorageManager } from "native-base";
import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { getInitialPreloadedQuery, getRelayProps } from "relay-nextjs/app";

import { getClientEnvironment } from "../lib/client";

declare global {
  interface Window {
    __GRAPHILE_APP__: {
      ROOT_URL?: string;
      T_AND_C_URL?: string;
    };
  }
}

NProgress.configure({
  showSpinner: false,
});

if (typeof window !== "undefined") {
  const nextDataEl = document.getElementById("__NEXT_DATA__");

  if (!nextDataEl || !nextDataEl.textContent) {
    throw new Error("Cannot read from __NEXT_DATA__ element");
  }

  const data = JSON.parse(nextDataEl.textContent);

  window.__GRAPHILE_APP__ = {
    ROOT_URL: data.query.ROOT_URL,
    T_AND_C_URL: data.query.T_AND_C_URL,
  };

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  Router.events.on("routeChangeError", (err: Error | string) => {
    NProgress.done();
    if (err["cancelled"]) {
      // No worries; you deliberately cancelled it
    } else {
      console.log({
        message: "Page load failed",
        description: `This is very embarrassing! Please reload the page. Further error details: ${
          typeof err === "string" ? err : err.message
        }`,
        duration: 0,
      });
    }
  });
}

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const colorManager: StorageManager = {
  get: async () => {
    try {
      let val = await localStorage.getItem("theme");
      return val === "dark" ? "dark" : "light";
    } catch (e) {
      return "light";
    }
  },
  set: async (value: ColorMode) => {
    try {
      await localStorage.setItem("theme", value);
    } catch (e) {
      console.log(e);
    }
  },
};

const clientEnv = getClientEnvironment();
const initialPreloadedQuery = getInitialPreloadedQuery({
  createClientEnvironment: () => getClientEnvironment()!,
});

function DUMApp({ Component, pageProps }: AppProps) {
  const relayProps = getRelayProps(pageProps, initialPreloadedQuery);
  const env = relayProps.preloadedQuery?.environment ?? clientEnv!;
  const router = useRouter();

  return (
    <SSRProvider>
      <NativeBaseProvider colorModeManager={colorManager}>
        <RelayEnvironmentProvider environment={env}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Component {...pageProps} {...relayProps} key={router.asPath} />
          </ErrorBoundary>
        </RelayEnvironmentProvider>
      </NativeBaseProvider>
    </SSRProvider>
  );
}

export default DUMApp;
