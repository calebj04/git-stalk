import { Suspense } from "react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { UserDetails } from "@/components/UserDetails";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-screen flex flex-col p-6">
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
        <div>
          <Suspense fallback={<div className="text-2xl">Loading...</div>}>
            <UserDetails />
          </Suspense>
        </div>
      </div>
      {/* Content */}
      <div className="h-full flex flex-1 justify-center items-center">
        <Suspense fallback={<div className="text-2xl">Loading...</div>}>
          {children}
        </Suspense>
      </div>
      {/* Footer */}
      <Footer />
    </main>
  );
}
