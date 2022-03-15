import { getAllPostsWithFrontMatter } from "@libs/getMarkdown";
import { NextPage } from "next";
import { CodingPostsProps } from "..";

const Tags: NextPage<CodingPostsProps> = ({ posts, tags }) => {
  console.log(posts, tags);
  return (
    <>
      <h1>tags</h1>
    </>
  );
};

export default Tags;

export async function getStaticProps() {
  const posts = await getAllPostsWithFrontMatter("posts");

  return {
    props: {
      posts,
      title: "코딩공부",
      description: "코딩 공부 하면서 기록",
    },
  };
}
