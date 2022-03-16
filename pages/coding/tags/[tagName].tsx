import { getAllPostsWithFrontMatter, getPostByTag } from "@libs/getMarkdown";
import { cls } from "@libs/utils";
import { prefix } from "constant";
import type { NextPage } from "next";
import { Params } from "next/dist/server/router";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ICodingPostsProps } from "..";

const Tag: NextPage<ICodingPostsProps> = ({ posts, tags }) => {
  const router = useRouter();
  const {
    query: { tagName },
  } = router;
  console.log(tags);
  console.log(posts);

  return (
    <>
      <Head>
        <title>Github Blog | Tags</title>
      </Head>
      <div className="flex flex-wrap gap-4 px-6 py-4">
        {tags.map((tag) => (
          <Link
            key={tag.name + "top"}
            href={`/coding/tags/${tag.name}`}
            as={prefix + `/coding/tags/${tag.name}`}
          >
            <a
              className={cls(
                tagName === tag.name ? "text-red-500" : "",
                "text-sm text-gray-500 hover:font-semibold hover:text-gray-700"
              )}
            >
              #{tag.name}
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
            .map((post) => (
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
            ))}
      </ul>
    </>
  );
};

export default Tag;

export async function getStaticPaths() {
  const posts = await getAllPostsWithFrontMatter("posts");

  const extractTags = posts.map((post) =>
    post.frontMatter.tags.map((tag: any) => tag)
  );
  const removeDuplication = (array: any[][]) => {
    const removeDuplication = [
      ...new Set(array.reduce((prev, current) => prev.concat(current), [])),
    ];
    return removeDuplication;
  };
  const tags = removeDuplication(extractTags);

  const paths = tags.map((filename: string) => ({
    params: {
      tagName: filename.replace(/\.md/, ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const { posts } = await getPostByTag(params.tagName);

  const extractTags = posts.map((post) =>
    post.frontMatter.tags.map((tag: string) => tag)
  );
  const removeDuplication = (array: any[][]) => {
    const removeDuplication = [
      ...new Set(array.reduce((prev, current) => prev.concat(current), [])),
    ];
    return removeDuplication.map((tag) => ({ name: tag, count: null }));
  };
  const tags = removeDuplication(extractTags);

  return {
    props: {
      posts,
      tags,
    },
  };
}
