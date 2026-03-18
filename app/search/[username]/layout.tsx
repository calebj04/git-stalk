import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-screen flex flex-col p-6">
      {/* Header */}
      <div className="w-full flex ">
        <div className="flex flex-1">
          <Logo className="w-16 h-10 cursor-pointer" />
        </div>
        <div className="flex-none">Search Bar</div>
        <div className="flex flex-1 justify-end">Avatar</div>
      </div>
      {/* Content */}
      <div className="h-full flex flex-col gap-6 items-center justify-center">
        <div className="h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </main>
  );
}
