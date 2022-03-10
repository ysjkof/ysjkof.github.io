import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { prefix } from "../constant";
import content from "../post/test.md";
import convertMarkdown from "../libs/convertMd";

const Home: NextPage = () => {
  const hl = convertMarkdown(content);

  return (
    <>
      <Head>
        <title>Github Blog | Main</title>
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
              <h1 className="text-red-400">Main</h1>
              <p>초기 설정 중입니다.</p>
              <div
                className="markdown-container"
                dangerouslySetInnerHTML={{ __html: hl }}
              ></div>
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

export default Home;

// export async function getServerSideProps() {
//   const { results } = await (await fetch(``)).json();
//   return { props: { results } };
// }
