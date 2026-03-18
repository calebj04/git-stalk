import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Auth error:", error);
  }

  return (
    <div>
      {data && !error ? (
        <div className="text-2xl">Hello, {data.user.email}</div>
      ) : (
        <div className="flex gap-6 items-center text-2xl ">
          <Link href="/auth/sign-in" className="cursor-pointer">
            Sign in
          </Link>
          <Link
            href={"/auth/sign-up"}
            className="cursor-pointer bg-green-900 py-1 px-2 rounded-xl"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex flex-col p-6">
      {/* Header */}
      <div className="w-full flex justify-between">
        <Logo className="w-16 h-10 cursor-pointer" />
        <Suspense fallback={<div className="text-2xl">Loading...</div>}>
          <UserDetails />
        </Suspense>
      </div>
      {/* Content */}
      <div className="h-full flex flex-1 flex-col items-center justify-center">
        <div className="flex justify-center w-full relative">
          <p className="text-6xl absolute -top-24">git stalk</p>
          <Suspense fallback={<div className="text-2xl">Loading...</div>}>
            <SearchBar icon={24} text="text-4xl" height={64} width={800} />
          </Suspense>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </main>
  );
}
