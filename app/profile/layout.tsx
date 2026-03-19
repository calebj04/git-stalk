import { Suspense } from "react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen w-screen flex flex-col p-6">
      {/* Header */}
      <div className="w-full flex justify-between">
        <div>
          <Logo className="w-16 h-10 cursor-pointer" />
        </div>
        <div>Avatar</div>
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
