import { getGitHubUser, getLastActiveCommit } from "@/lib/gitAPI";
import Image from "next/image";
import Link from "next/link";

export default async function SearchUsername({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const search = (await searchParams).q || "";

  let user;
  try {
    user = await getGitHubUser(search);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return <div className="text-2xl">Error: {err.message}</div>;
    } else {
      throw new Error("Unknown error occurred");
    }
  }

  const lastActive = await getLastActiveCommit(user.login);

  return (
    <div className="w-full flex pt-12">
      <div className="text-2xl flex flex-col pr-3">
        <div className="flex pb-2 border-b-2">
          <div className="relative w-24 h-24">
            <Link href={user.html_url} target="_blank">
              <Image
                src={user.avatar_url}
                alt={user.login}
                className="h-full w-full object-cover rounded-full"
                fill
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-4xl">
              <Link href={user.html_url} target="_blank">
                {user.name || user.login}
              </Link>
            </div>
            <Link href={lastActive?.url || ""} target="_blank">
              <div className="text-sm">Active {lastActive?.time}</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-2xl flex-1 flex justify-center pl-3">
        Results for:
        {user.login}
      </div>
    </div>
  );
}
