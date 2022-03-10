import "../styles/globals.css";
import "../styles/markdown.css";
import "highlight.js/styles/atom-one-light.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
