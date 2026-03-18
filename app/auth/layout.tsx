import Logo from "@/components/Logo";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen w-screen flex flex-col p-6 relative">
      {/* Header */}
      <div>
        <Logo className="w-16 h-10 cursor-pointer absolute" />
      </div>
      <div>{children}</div>
    </main>
  );
}
