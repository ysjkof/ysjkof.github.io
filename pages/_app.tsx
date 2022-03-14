import "../styles/globals.css";
import "../styles/markdown.css";
import "../styles/markdown-code-block.css";
import type { AppProps } from "next/app";
import Header from "components/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="text-gray-700">
      <Header />
      <main className="container mx-auto h-full">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
