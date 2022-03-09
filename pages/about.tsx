import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { prefix } from "../constant";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>Github Blog | About</title>
      </Head>
      <main>
        <h1>About</h1>
        <p>초기 설정 중입니다.</p>
        <Link href="/" as={prefix + "/"}>
          <a>메인으로</a>
        </Link>
      </main>
    </>
  );
};

export default About;
