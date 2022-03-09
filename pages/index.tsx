import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { prefix } from "../constant";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Github Blog | Maib</title>
      </Head>
      <main>
        <h1 className="text-red-400">Main</h1>
        <p>초기 설정 중입니다.</p>
        <Link href="/about" as={prefix + "/about"}>
          <a>어바웃으로</a>
        </Link>
      </main>
    </>
  );
};

export default Home;
