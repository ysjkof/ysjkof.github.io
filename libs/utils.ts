export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

const mode = (option: "dev" | "prod") => {
  return option === "dev" ? "posts-test" : "posts";
};

export const FOLDER_NAME_TO_PARSE = mode("prod");
