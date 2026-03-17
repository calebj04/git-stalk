export default function Home() {
  return (
    <main className="h-screen w-screen flex flex-col">
      <div className="w-full flex justify-between">
        <div>logo</div>
        <div className="flex gap-3">
          <div>Sign in</div>
          <div>Sign up</div>
        </div>
      </div>
      <div className="h-full flex w-full items-center justify-center">
        content
      </div>
    </main>
  );
}
