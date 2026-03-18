import { getGitHubUser } from "@/lib/gitAPI";

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

  return (
    <div className="w-full flex py-6">
      <div className="text-2xl flex flex-col border-2 pr-3">for:{user.login}</div>
      <div className="text-2xl flex-1 flex justify-center pl-3">Results for:{user.login} Results for:{user.login} Results for:{user.login}</div>
    </div>
  );
}
