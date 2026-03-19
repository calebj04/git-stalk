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

  const stats = [
    {
      label: "Followers",
      value: user.stats.followers,
      url: `https://github.com/${user.user.login}?tab=followers`,
    },
    {
      label: "Following",
      value: user.stats.following,
      url: `https://github.com/${user.user.login}?tab=following`,
    },
    {
      label: "Repositories",
      value: user.stats.repos,
      url: `https://github.com/${user.user.login}?tab=repositories`,
    },
    {
      label: "Stars",
      value: user.stats.stars,
      url: `https://github.com/${user.user.login}?tab=stars`,
    },
  ];

  return (
    <div className="w-full flex pt-12 mb-6">
      <div>
        <div className="text-2xl flex flex-col bg-white p-6 rounded-2xl min-w-96">
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
          <div className="bg-gray-500 w-full h-0.5 mb-3 rounded-full"></div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, i) => {
              return (
                <Link key={i} href={stat.url} target="_blank">
                  <div className="bg-gray-50 aspect-square rounded-xl text-black flex flex-col items-center justify-center">
                    <p>{stat.label}:</p>
                    <p>{stat.value}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="text-2xl flex-1 flex justify-center pl-3">
        Results for:
      </div>
    </div>
  );
}
