import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50  backdrop-blur-xs border-b border-stone-200 px-10 h-14 flex items-center justify-between">
      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-stone-700">
        Flight Pricing
      </span>
      <span>
        <Link className="font-black" href={"/documentation"}>
          Documentation
        </Link>
      </span>
      <span className="flex gap-8">
        <Link href={"/"}>Home</Link>
        <Link href={"/trips"}>Trips</Link>
      </span>
    </nav>
  );
}
