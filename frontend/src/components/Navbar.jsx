import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50  backdrop-blur-xs border-b border-stone-200 px-10 h-14 flex items-center justify-between">
      <span className="text-xs p-2 pl-2 pr-2 bg-white/20 rounded-3xl font-semibold tracking-[0.2em] uppercase text-black ">
        Flight Pricing
      </span>
      <span>
        <Link
          className="font-black p-2 pl-2 pr-2 bg-white/20 rounded-3xl "
          href={"/documentation"}
        >
          Documentation
        </Link>
      </span>
      <span className="flex gap-8 p-2 pl-2 pr-2 bg-white/20 rounded-3xl ">
        <Link href={"/"}>Home</Link>
        <Link href={"/trips"}>Trips</Link>
      </span>
    </nav>
  );
}
