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
        <p>초기 설정 중입니다.</p>
      </section>
    </>
  );
};

export default Intro;
