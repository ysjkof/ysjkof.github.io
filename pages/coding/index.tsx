import { getAllPostsWithFrontMatter } from "@libs/getMarkdown";
import { prefix } from "constant";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

interface FrontMatter {
  description: string;
  publishedDate: string;
  tags: any[];
  title: string;
}
interface Post {
  frontMatter: FrontMatter;
  slug: string;
}
interface BlogProps {
  title: string;
  description: string;
  posts: Post[];
}
const Posts: NextPage<BlogProps> = ({ title, description, posts }) => {
  console.log(title, description, posts);
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
            {!posts && <div>No posts!</div>}
            <ul className="w-full">
              {posts &&
                posts
                  .sort(
                    (a, b) =>
                      new Date(b.frontMatter.publishedDate).getTime() -
                      new Date(a.frontMatter.publishedDate).getTime()
                  )
                  .map((post) => {
                    return (
                      <article
                        key={post.slug}
                        className="post-title border w-full"
                      >
                        <Link href={{ pathname: `/coding/${post.slug}` }}>
                          <a>{post.frontMatter.title}</a>
                        </Link>{" "}
                        - {post.frontMatter.description}
                        <p>#tag : {post.frontMatter.tags.join(", ")}</p>
                      </article>
                    );
                  })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;

export async function getStaticProps() {
  const posts = await getAllPostsWithFrontMatter("posts");

  return {
    props: {
      posts,
      title: "Blog",
      description: "Posts on software engineering",
    },
  };
}
