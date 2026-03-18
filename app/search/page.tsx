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

  return <div className="text-2xl">Results for: {user.login}</div>;
}
