import { getFiles, getPostBySlug } from "@libs/getMarkdown";
import handleMarkdown from "@libs/handleMarkdown";
import { FOLDER_NAME_TO_PARSE } from "@libs/utils";
import type { NextPage } from "next";
import { Params } from "next/dist/server/router";
import Head from "next/head";

interface FrontMatter {
  description: string;
  publishedDate: string;
  lastModifiedAt: string;
  tags: any[];
  title: string;
}
interface PostProps {
  frontMatter: FrontMatter;
  markdownBody: any;
}

const Post: NextPage<PostProps> = ({ frontMatter, markdownBody }) => {
  const htmlContent = handleMarkdown(markdownBody);
  const { description, publishedDate, lastModifiedAt, tags, title } =
    frontMatter;
  return (
    <>
      <Head>
        <title>Github Blog | Coding</title>
      </Head>
      <section className="mx-auto flex h-full min-h-screen justify-between">
        <aside className="">
          <div className="h-full"></div>
        </aside>
        <article
          className="markdown-container w-full max-w-2xl text-gray-500"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        <aside className="">
          <div className="h-full"></div>
        </aside>
      </section>
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const posts = await getFiles(FOLDER_NAME_TO_PARSE);
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
    FOLDER_NAME_TO_PARSE,
    params.slug
  );

  return {
    props: {
      frontMatter,
      markdownBody,
    },
  };
}
