"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [open, setOpen] = useState(false);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }
  return (
    <div className="h-10 flex justify-center items-center w-full relative">
      <div
        onClick={() => {
          openModal();
        }}
        className="absolute left-0 top-1/2 -translate-y-1/2"
      >
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
      <p className="text-sm">
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
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div onClick={closeModal} className="absolute inset-0 bg-black/50" />

          <div className="relative bg-white text-black rounded-2xl p-6 shadow-xl w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-2">What is git stalk?</h2>
            <p className="text-sm text-gray-600">
              git stalk is a website designed to improve your stalking effecieny
              (of GitHub users, of course). Currently, you can stalk basic
              information from users such as recent activity and repos, but stay
              tuned for more updates!
            </p>

            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
