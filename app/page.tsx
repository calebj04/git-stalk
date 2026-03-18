import Link from "next/link";
import Logo from "./../components/Logo";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col p-6">
      {/* Header */}
      <div className="w-full flex justify-between">
        <div>
          <Logo className="w-16 h-10 cursor-pointer" />
        </div>
        <div className="flex gap-6 items-center text-2xl ">
          <div className="cursor-pointer">Sign in</div>
          <div className="cursor-pointer bg-green-900 py-1 px-2 rounded-xl">
            Sign up
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="h-full flex flex-col gap-6 items-center justify-center">
        <div className="flex justify-center w-full relative">
          <p className="text-6xl absolute -top-24">git stalk</p>
          <form role="search" className="relative w-full max-w-[800px]">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Interface / Search_Magnifying_Glass">
                <path
                  id="Vector"
                  d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>

            <input
              type="search"
              placeholder="search a git username"
              className="bg-white text-black pb-1 pl-12 pr-4 rounded-full text-4xl w-full h-16 outline-none focus:ring-2 focus:ring-green-900"
            />
          </form>
        </div>
      </div>
      {/* Footer */}
      <div className="h-10 flex justify-center w-full relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <svg
            className="w-6 h-6 text-white cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Warning / Info">
              <path
                id="Vector"
                d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </div>
        <p>
          Built with{" "}
          <Link
            href="https://nextjs.org"
            target="_blank"
            className="font-extrabold"
          >
            Next.js
          </Link>{" "}
          •{" "}
          <Link
            href="https://tailwindcss.com/"
            target="_blank"
            className="font-extrabold"
          >
            Tailwind CSS
          </Link>{" "}
          •{" "}
          <Link
            href="https://supabase.com/"
            target="_blank"
            className="font-extrabold"
          >
            Supabase
          </Link>{" "}
        </p>
      </div>
    </main>
  );
}
