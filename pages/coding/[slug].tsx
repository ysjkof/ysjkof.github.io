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
      <section className="mx-auto flex h-full">
        <aside className="w-full">
          <div className="h-full"></div>
        </aside>
        <article
          className="markdown-container w-full max-w-2xl border-r border-l text-gray-500"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        <aside className="w-full">
          <div className="h-full"></div>
        </aside>
      </section>
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
