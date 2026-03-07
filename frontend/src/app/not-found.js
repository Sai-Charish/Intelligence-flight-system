import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center text-center max-w-sm">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400 mb-5">
          Error · 404
        </p>

        <h1 className="text-5xl font-light text-stone-800 leading-tight tracking-tight">
          Page
          <br />
          <span className="font-semibold text-stone-900">Not Found</span>
        </h1>

        <p className="text-stone-400 mt-4 mb-10 text-sm font-light leading-relaxed max-w-xs">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          href="/"
          className="px-6 py-2.5 bg-stone-900 text-white text-xs font-medium tracking-wide rounded-lg hover:bg-stone-700 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>

      <div className="w-px h-16 bg-stone-200 mt-20" />
    </div>
  );
}
