import { cls } from "@libs/utils";
import { prefix } from "constant";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className="border-b text-2xl font-medium">
      <nav className="w-ful container mx-auto h-full">
        <ul className="flex w-full justify-end gap-8">
          <li
            className={cls(
              "flex border-b border-transparent hover:border-sky-300",
              router.pathname === "/" ? "border-sky-500" : ""
            )}
          >
            <Link href="/" as={prefix + "/"}>
              처음화면
            </Link>
          </li>
          <li
            className={cls(
              "flex border-b border-transparent hover:border-sky-300",
              router.pathname === "/intro" ? "border-sky-500" : ""
            )}
          >
            <Link href="/intro" as={prefix + "/intro"}>
              주인이력
            </Link>
          </li>
          <li
            className={cls(
              "flex border-b border-transparent hover:border-sky-300",
              router.pathname === "/coding" ? "border-sky-500" : ""
            )}
          >
            <Link href="/coding" as={prefix + "/coding"}>
              코딩공부
            </Link>
          </li>
          <li
            className={cls(
              "flex border-b border-transparent hover:border-sky-300",
              router.pathname === "/project" ? "border-sky-500" : ""
            )}
          >
            <Link href="/project" as={prefix + "/project"}>
              프로젝트
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
