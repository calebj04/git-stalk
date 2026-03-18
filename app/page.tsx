import Logo from "./../components/Logo";

export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col p-6 relative">
      <div className="w-full flex justify-between">
        <div>
          <Logo className="w-16 h-16" />
        </div>
        <div className="flex gap-6 items-center text-2xl ">
          <div>Sign in</div>
          <div className="bg-green-900 py-1 px-2 rounded-xl">Sign up</div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[120px] text-6xl">
        <p>git stalk</p>
      </div>
      <div className="absolute inset-0 h-full flex w-full items-center justify-center">
        <form role="search" className="relative">
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
            className="bg-white text-black py-1 pl-12 pr-4 rounded-full text-4xl min-w-[800px] h-16 outline-none focus:ring-2 focus:ring-green-900"
          />
        </form>
      </div>
    </main>
  );
}
