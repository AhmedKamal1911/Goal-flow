"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-50 to-red-100 text-center p-6">
      <div className="text-red-600 text-8xl mb-6 animate-bounce">⚠️</div>

      <h1 className="text-4xl font-extrabold text-red-700">Oops!</h1>
      <p className="mt-2 text-gray-700 text-lg">
        {error?.message || "Something went wrong."}
      </p>

      <button
        onClick={reset}
        className="mt-6 px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-md"
      >
        Try Again
      </button>

      <p className="mt-6 text-gray-400 text-sm italic">
        Goal Flow — Keep your goals on track 🚀
      </p>
    </div>
  );
}
