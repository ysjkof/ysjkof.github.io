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
      {!posts && <div>No posts!</div>}
      <ul className="h-full w-full space-y-4 py-4">
        {posts &&
          posts
            .sort(
              (a, b) =>
                new Date(b.frontMatter.publishedDate).getTime() -
                new Date(a.frontMatter.publishedDate).getTime()
            )
            .map((post) => {
              console.log(post.frontMatter);
              return (
                <article
                  key={post.slug}
                  className="post-title w-full rounded-2xl border px-5 py-1 shadow"
                >
                  <div className="flex justify-between">
                    <Link href={{ pathname: `/coding/${post.slug}` }}>
                      <a className="text-xl">{post.frontMatter.title}</a>
                    </Link>{" "}
                    <ul className="flex gap-4 text-sm text-gray-500">
                      {post.frontMatter.tags.map((tag) => (
                        <li>#{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-sm text-gray-500">
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

  return {
    props: {
      posts,
      title: "Blog",
      description: "Posts on software engineering",
    },
  };
}
