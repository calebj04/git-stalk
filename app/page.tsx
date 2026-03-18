import Logo from "./../components/Logo";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col p-6">
      {/* Header */}
      <div className="w-full flex justify-between">
        <div>
          <Logo className="w-16 h-10" />
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
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="search"
              placeholder="search a git username"
              className="bg-white text-black py-1 pl-12 pr-4 rounded-full text-4xl w-full h-16 outline-none focus:ring-2 focus:ring-green-900"
            />
          </form>
        </div>
      </div>
      {/* Footer */}
      <div className="h-10 flex justify-center w-full" aria-hidden="true">
        Built with Next.js, Tailwind, Supabase, Visual Studio Code, & (of
        course) GitHub
      </div>
    </main>
  );
}
