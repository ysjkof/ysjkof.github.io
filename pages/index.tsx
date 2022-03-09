import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { prefix } from "../constant";

const Home: NextPage = () => {
  return (
    <div className="h-screen max-w-7xl mx-auto">
      <Head>
        <title>Github Blog | Main</title>
      </Head>
      <header className="space-x-6 font-semibold text-3xl text-gray-700">
        <Link href="/" as={prefix + "/"}>
          <a>메인</a>
        </Link>
        <Link href="/about" as={prefix + "/about"}>
          <a>어바웃</a>
        </Link>
      </header>
      <main className="h-full flex justify-between">
        <aside className="w-52 bg-slate-100"></aside>
        <article className="w-full">
          <h1 className="text-red-400">Main</h1>
          <p>초기 설정 중입니다.</p>
        </article>
        <aside className="w-52"></aside>
      </main>
    </div>
  );
};

export default Home;
