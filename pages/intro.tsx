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
      <div className="h-screen mx-auto container text-gray-500">
        <header className="space-x-6 font-semibold text-3xl flex justify-end border-b">
          <Link href="/" as={prefix + "/"}>
            <a>메인</a>
          </Link>
          <Link href="/about" as={prefix + "/about"}>
            <a>어바웃</a>
          </Link>
        </header>
        <div className="flex h-full">
          <nav className="left-sidebar h-full w-52 border-r">
            <ul className="">
              <li>
                <Link href="/" as={prefix + "/"}>
                  처음화면
                </Link>
              </li>
              <li>
                <Link href="/intro" as={prefix + "/intro"}>
                  주인이력
                </Link>
              </li>
              <li>
                <Link href="/code" as={prefix + "/code"}>
                  코딩기록
                </Link>
              </li>
              <li>
                <Link href="/project" as={prefix + "/project"}>
                  프로젝트
                </Link>
              </li>
            </ul>
          </nav>
          <div className="h-full w-full flex justify-between">
            <article className="w-full">
              <h1 className="text-red-400">Intro</h1>
              <p>초기 설정 중입니다.</p>
            </article>
            <div className="w-52">
              <div className="w-full h-full bg-yellow-100 rounded-md border border-yellow-200"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
