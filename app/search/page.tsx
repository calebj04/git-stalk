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
    <div className="w-full flex items-center justify-center p-12">
      <div className="flex lg:flex-row flex-col gap-6">
        <div className="text-2xl flex justify-center items-center bg-white p-6 rounded-2xl">
          <div className="flex flex-col gap-3 items-center">
            <div className="relative w-48 h-48">
              <Link href={user.user.html_url} target="_blank">
                <Image
                  src={user.user.avatar_url}
                  alt={user.user.login}
                  className="h-full w-full object-cover rounded-full"
                  fill
                />
              </Link>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="text-5xl text-black">
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
        </div>
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, i) => {
            return (
              <Link key={i} href={stat.url} target="_blank">
                <div className="bg-white aspect-square rounded-xl text-xl text-black flex flex-col items-center justify-center">
                  <p>{stat.label}:</p>
                  <p>{stat.value}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
