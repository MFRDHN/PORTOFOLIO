import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-6 text-center">
      <span className="font-monument text-[15vw] md:text-[12vw] leading-none text-red-600 select-none">
        404
      </span>
      <h1 className="font-monument text-2xl md:text-4xl uppercase tracking-tight mt-4">
        Page Not Found
      </h1>
      <p className="text-white/40 font-mono text-sm mt-3 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-10 px-8 py-4 border border-white/10 text-white font-monument text-[9px] uppercase tracking-widest hover:bg-red-600 hover:border-red-600 transition-all duration-300"
      >
        Back to Home
      </Link>
    </main>
  );
}
