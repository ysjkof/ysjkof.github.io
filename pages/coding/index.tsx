import { getAllPostsWithFrontMatter } from "@libs/getMarkdown";
import { prefix } from "constant";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

interface FrontMatter {
  description: string;
  publishedDate: string;
  lastModifiedAt: string;
  tags: any[];
  title: string;
}
interface Post {
  frontMatter: FrontMatter;
  slug: string;
}
interface CodingPostsProps {
  title: string;
  description: string;
  posts: Post[];
  tags: string[];
}
const Posts: NextPage<CodingPostsProps> = ({
  title,
  description,
  posts,
  tags,
}) => {
  // console.log(title, description, posts);
  return (
    <>
      <Head>
        <title>Github Blog | Coding</title>
      </Head>
      <div className="flex flex-wrap gap-4 px-6 py-4">
        {tags.map((tag) => (
          <div className="text-sm text-gray-500 hover:font-semibold hover:text-gray-700">
            #{tag}
          </div>
        ))}
      </div>
      {!posts && <div>No posts!</div>}
      <p className="space-x-2"></p>
      <ul className="h-full w-full space-y-4 py-4 px-1">
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
                  className="post-title w-full rounded-2xl border px-5 py-1 shadow hover:border-transparent hover:ring-2 hover:ring-blue-500"
                >
                  <div className="mb-1 flex justify-between text-xs text-gray-500">
                    <ul className="flex gap-4">
                      {post.frontMatter.tags.map((tag) => (
                        <li>#{tag}</li>
                      ))}
                    </ul>
                    <span>{post.frontMatter.lastModifiedAt}에 수정됨</span>
                  </div>
                  <div className="flex justify-between">
                    <Link
                      href={`/coding/${post.slug}`}
                      as={prefix + `/coding/${post.slug}`}
                    >
                      <a className="mb-2 w-full text-2xl font-semibold">
                        {post.frontMatter.title}
                      </a>
                    </Link>
                  </div>
                  <p className="mb-2 text-sm text-gray-500">
                    {post.frontMatter.description}
                  </p>
                </article>
              );
            })}
      </ul>
    </>
  );
};

export default Posts;

export async function getStaticProps() {
  const posts = await getAllPostsWithFrontMatter("posts");

  const extractTags = posts.map((post) =>
    post.frontMatter.tags.map((tag: any) => tag)
  );
  const removeDuplication = (array: any[][]) => {
    const removeDuplication = new Set(
      array.reduce((prev, current) => prev.concat(current), [])
    );
    // @ts-ignore
    return [...removeDuplication];
  };
  const tags = removeDuplication(extractTags);

  return {
    props: {
      posts,
      tags,
      title: "코딩공부",
      description: "코딩 공부 하면서 기록",
    },
  };
}
