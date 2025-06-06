import { SignUp } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

export default function Page() {
  return (
    <section className="relative min-h-screen w-full bg-gray-900 text-white flex items-center justify-center">
      {/* Background image with overlay */}
      <img
        src="https://images.unsplash.com/photo-1488866022504-f2584929ca5f?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Interview prep"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Content centered */}
      <main className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            AI Interview Assistant
          </h1>
          <p className="mt-2 text-white/80">
            Practice real interviews with AI. Sharpen your skills. Get hired.
          </p>
        </div>

        <SignUp appearance={{ baseTheme: shadesOfPurple }} />

      </main>
    </section>
  );
}
