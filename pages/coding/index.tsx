import { getAllPostsWithFrontMatter } from "@libs/getMarkdown";
import { prefix } from "constant";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

interface IRemoveDuplicationOutput {
  withDuplicates: ITag[];
  withoutDuplicates: ITag[];
}
interface ITag {
  name: string;
  count?: number | string;
}

interface IFrontMatter {
  description: string;
  publishedDate: string;
  lastModifiedAt: string;
  tags: string[];
  title: string;
}
interface IPost {
  frontMatter: IFrontMatter;
  slug: string;
}
export interface ICodingPostsProps {
  title: string;
  description: string;
  posts: IPost[];
  tags: ITag[];
}

const Posts: NextPage<ICodingPostsProps> = ({ posts, tags }) => {
  return (
    <>
      <Head>
        <title>Github Blog | Coding</title>
      </Head>
      <div className="flex flex-wrap gap-4 px-6 py-4">
        {tags.map((tag) => (
          <Link
            key={tag.name}
            href={`/coding/tags/${tag.name}`}
            as={prefix + `/coding/tags/${tag.name}`}
          >
            <a className="space-x-0.5 text-sm text-gray-500 hover:font-semibold hover:text-gray-700">
              <span>#{tag.name}</span>
              <span className="text-xs">({tag.count})</span>
            </a>
          </Link>
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
                        <li key={tag}>#{tag}</li>
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
    post.frontMatter.tags.map((tag: string) => tag)
  );
  const removeDuplication = (inputArray: any[][]): IRemoveDuplicationOutput => {
    const withDuplicates = inputArray.reduce(
      (prev, current) => prev.concat(current),
      []
    );
    const withoutDuplicates = [...new Set(withDuplicates)];
    return { withDuplicates, withoutDuplicates };
  };
  const addCount = ({
    withDuplicates,
    withoutDuplicates,
  }: IRemoveDuplicationOutput) => {
    const count = withoutDuplicates.map((tag) =>
      withDuplicates.filter((spreadTag) => spreadTag === tag)
    );
    const result = count.map((tag) => ({ name: tag[0], count: tag.length }));
    return result;
  };
  const tags = addCount(removeDuplication(extractTags));

  return {
    props: {
      posts,
      tags,
    },
  };
}
