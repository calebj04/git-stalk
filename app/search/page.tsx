export default async function SearchUsername({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const username = (await searchParams).q || "";

  return <div>Results for: {username}</div>;
}
