import { getUserInfo } from "@/lib/gitAPI";
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
    user = await getUserInfo(search);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return <div className="text-2xl">Error: {err.message}</div>;
    } else {
      throw new Error("Unknown error occurred");
    }
  }

  return (
    <div className="w-full flex pt-12">
      <div>
        <div className="text-2xl flex flex-col bg-white p-3 rounded-2xl">
          <div className="flex pb-2">
            <div className="relative w-24 h-24">
              <Link href={user.user.html_url} target="_blank">
                <Image
                  src={user.user.avatar_url}
                  alt={user.user.login}
                  className="h-full w-full object-cover rounded-full"
                  fill
                />
              </Link>
            </div>
            <div className="ml-2 flex flex-col justify-center">
              <div className="text-4xl text-black">
                <Link href={user.user.html_url} target="_blank">
                  {user.user.name || user.user.login}
                </Link>
              </div>
              <Link
                href={user.lastActive.url || user.user.html_url}
                target="_blank"
              >
                <div className="text-sm text-gray-500">
                  Active {user.lastActive.time}
                </div>
              </Link>
            </div>
          </div>
          <div className="bg-gray-500 w-full h-0.5 rounded-full"></div>
        </div>
      </div>
      <div className="text-2xl flex-1 flex justify-center pl-3">
        Results for:
        {user.login}
      </div>
    </div>
  );
}
