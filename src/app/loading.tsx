export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">
          Loading
        </span>
      </div>
    </div>
  );
}
