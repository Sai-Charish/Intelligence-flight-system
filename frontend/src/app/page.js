"use client";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6">
      {/* Hero */}
      <div className="flex flex-col items-center text-center max-w-xl">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400 mb-5">
          Machine Learning · Flight Pricing
        </p>

        <h1 className="text-5xl font-light text-stone-800 leading-tight tracking-tight">
          Intelligent
          <br />
          <span className="font-semibold text-stone-900">Flight Pricing</span>
        </h1>

        <p className="text-stone-400 mt-4 mb-10 text-sm font-light leading-relaxed max-w-sm">
          Smart airline ticket pricing powered by machine learning
        </p>
      </div>

      <SearchBar />

      {/* Divider */}
      <div className="w-px h-16 bg-stone-200 mt-20 mb-16" />

      {/* About */}
      <div className="max-w-lg text-center">
        <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-stone-400 mb-6">
          About
        </h2>
        <p className="text-stone-500 text-sm font-light leading-loose">
          This platform demonstrates how airlines dynamically adjust ticket
          prices using machine learning. Instead of fixed pricing, flight fares
          change based on booking demand, historical trends, and predicted
          passenger interest.
        </p>
        <p className="text-stone-500 text-sm font-light leading-loose mt-4">
          The system analyzes flight demand patterns and recommends optimal
          pricing strategies to maximize airline revenue while maintaining
          competitive ticket pricing.
        </p>
      </div>
    </div>
  );
}
