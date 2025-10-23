import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-center p-6 animate-fadeIn">
      <div className="max-w-md">
        <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-500">
          Looks like the goal you’re looking for doesn’t exist 💭
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Link>
      </div>

      <div className="absolute bottom-10 text-sm text-gray-400">
        Goal Flow — Stay on track 🚀
      </div>
    </main>
  );
}
