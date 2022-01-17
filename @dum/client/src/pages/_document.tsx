import { getInitialProps } from "@expo/next-adapter/document";
import NextDocument, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import * as React from "react";
import { createRelayDocument, RelayDocument } from "relay-nextjs/document";
interface DocumentProps {
  relayDocument: RelayDocument;
}

class CustomDocument extends NextDocument<DocumentProps> {
  render() {
    const { relayDocument } = this.props;

    return (
      <Html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />
          <relayDocument.Script />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async (ctx: DocumentContext) => {
  const relayDocument = createRelayDocument();

  const renderPage = ctx.renderPage;
  ctx.renderPage = () =>
    renderPage({
      enhanceApp: (App) => relayDocument.enhance(App),
    });

  const initialProps = await getInitialProps(ctx);

  return {
    ...initialProps,
    relayDocument,
  };
};

export default CustomDocument;
