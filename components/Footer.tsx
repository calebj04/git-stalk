import Link from "next/link";

export default function Footer() {
  return (
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
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
  );
}
