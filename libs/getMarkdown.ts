import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { FOLDER_NAME_TO_PARSE } from "./utils";

const root = process.cwd();

export async function getFiles(dataType: string) {
  return fs.readdirSync(path.join(root, "data", dataType), "utf-8");
}

export async function getPostByTag(tagName: string): Promise<{ posts: any[] }> {
  const posts = await getAllPostsWithFrontMatter(FOLDER_NAME_TO_PARSE);

  const extractPostsByTag = posts.filter((post) => {
    const index = post.frontMatter.tags.includes(tagName);
    if (index) {
      return post;
    }
  });

  return { posts: extractPostsByTag };
}

export async function getPostBySlug(dataType: string, slug: string) {
  const source = fs.readFileSync(
    path.join(root, "data", dataType, `${slug}.md`),
    "utf8"
  );

  const { data, content } = matter(source);
  return {
    frontMatter: data,
    markdownBody: content,
  };
}

export async function getAllPostsWithFrontMatter(
  dataType: string
): Promise<any[]> {
  const files = fs.readdirSync(path.join(root, "data", dataType));

  // @ts-ignore
  return files.reduce((allPosts, postSlug) => {
    const source = fs.readFileSync(
      path.join(root, "data", dataType, postSlug),
      "utf8"
    );
    const { data } = matter(source);
    return [
      {
        frontMatter: data,
        slug: postSlug.replace(".md", ""),
      },
      ...allPosts,
    ];
  }, []);
}
