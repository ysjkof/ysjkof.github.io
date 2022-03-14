import { getFiles, getPostBySlug } from "@libs/getMarkdown";
import handleMarkdown from "@libs/handleMarkdown";
import { prefix } from "constant";
import type { NextPage } from "next";
import { Params } from "next/dist/server/router";
import Head from "next/head";
import Link from "next/link";

interface FrontMatter {
  description: string;
  publishedDate: string;
  tags: any[];
  title: string;
}
interface PostProps {
  frontMatter: FrontMatter;
  markdownBody: any;
}

const Post: NextPage<PostProps> = ({ frontMatter, markdownBody }) => {
  const htmlContent = handleMarkdown(markdownBody);
  console.log(frontMatter);
  return (
    <>
      <Head>
        <title>Github Blog | Coding</title>
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
        <div className="flex h-full flex-col">
          <nav className="left-sidebar h-full w-ful border-r">
            <ul className="flex gap-6">
              <li className="border-b-2 hover:border-gray-400 border-transparent">
                <Link href="/" as={prefix + "/"}>
                  처음화면
                </Link>
              </li>
              <li className="border-b-2 hover:border-gray-400 border-transparent">
                <Link href="/intro" as={prefix + "/intro"}>
                  주인이력
                </Link>
              </li>
              <li className="border-b-2 hover:border-gray-400 border-transparent">
                <Link href="/code" as={prefix + "/coding"}>
                  코딩기록
                </Link>
              </li>
              <li className="border-b-2 hover:border-gray-400 border-transparent">
                <Link href="/project" as={prefix + "/project"}>
                  프로젝트
                </Link>
              </li>
            </ul>
          </nav>
          <div className="h-full w-full flex justify-between border-t border-b">
            {/* <section frontMatter={frontMatter}>
          
              />
            </section> */}
            <article
              className="markdown-container"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const posts = await getFiles("posts");
  const paths = posts.map((filename: string) => ({
    params: {
      slug: filename.replace(/\.md/, ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const { frontMatter, markdownBody } = await getPostBySlug(
    "posts",
    params.slug
  );

  return {
    props: {
      frontMatter,
      markdownBody,
    },
  };
}
