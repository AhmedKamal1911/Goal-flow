export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-800">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent animate-spin absolute top-0 left-0 rounded-full"></div>
        </div>

        {/* App name / message */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-700">
            Goal Flow
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Loading your goals... stay focused 🚀
          </p>
        </div>
      </div>
    </main>
  );
}
