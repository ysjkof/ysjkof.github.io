import { prefix } from "constant";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Github Blog | Main</title>
      </Head>
      <section className="w-full">
        <h1 className="text-red-400">Main</h1>
        <p className="mt-20 text-center text-2xl text-gray-500">
          처음화면 준비중
        </p>
      </section>
    </>
  );
};

export default Home;
