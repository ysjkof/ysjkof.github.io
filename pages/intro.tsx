import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { prefix } from "../constant";

const Intro: NextPage = () => {
  return (
    <>
      <Head>
        <title>Github Blog | Intro</title>
      </Head>
      <section className="w-full">
        <h1 className="text-red-400">Intro</h1>
        <p className="mt-20 text-center text-2xl text-gray-500">
          주인이력 준비중
        </p>
      </section>
    </>
  );
};

export default Intro;
