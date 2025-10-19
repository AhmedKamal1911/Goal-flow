import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Goal Flow",
  description: "Stay focused. Reach your goals with Goal Flow Dashboard.",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={
        "min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-indigo-100 text-gray-900 antialiased"
      }
    >
      <div className="flex flex-col items-center justify-center flex-1 p-3 sm:p-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            Goal Flow
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Stay focused. Reach your goals.
          </p>
        </div>

        <main className="w-full flex justify-center">{children}</main>
      </div>

      <footer className="pb-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Goal Flow. All rights reserved.
      </footer>
    </div>
  );
}
