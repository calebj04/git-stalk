import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function UserDetails() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Auth error:", authError);
    return null;
  }

  if (!user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("username, avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    console.error("Profile retrieval error:", profileError);
  }

  return (
    <div className="text-2xl">
      {profile ? (
        <div>
          <Link href={"/profile"} className="font-extrabold">
            <img className="w-10 rounded-full" src={profile.avatar_url} />
          </Link>
        </div>
      ) : (
        <div className="flex gap-6 items-center text-2xl ">
          <Link
            href={"/profile"}
            className="cursor-pointer bg-green-900 py-1 px-2 rounded-xl"
          >
            Create Profile
          </Link>
        </div>
      )}
    </div>
  );
}
