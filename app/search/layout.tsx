import { Suspense } from "react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-screen flex flex-col p-6">
      {/* Header */}
      <div className="w-full flex justify-between">
        <div>
          <Logo className="w-16 h-10 cursor-pointer" />
        </div>
        <div className="w-full flex justify-center text-2xl">
          <Suspense fallback={<div className="text-2xl">Loading...</div>}>
            <SearchBar icon={18} text="text-2xl" height={32} width={600} />
          </Suspense>
        </div>
        <div>Avatar</div>
      </div>
      {/* Content */}
      <div className="h-full flex flex-col gap-6 items-center justify-center">
        <div className="h-full flex flex-col items-center justify-center">
          <Suspense fallback={<div className="text-2xl">Loading...</div>}>
            {children}
          </Suspense>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </main>
  );
}
