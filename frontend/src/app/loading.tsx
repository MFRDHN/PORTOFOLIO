export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        <div className="h-6 w-28 rounded bg-white/10 animate-pulse" />
        <div className="hidden md:flex items-center gap-8">
          <div className="h-3 w-14 rounded bg-white/10 animate-pulse" />
          <div className="h-3 w-16 rounded bg-white/10 animate-pulse" />
          <div className="h-3 w-16 rounded bg-white/10 animate-pulse" />
          <div className="h-3 w-14 rounded bg-white/10 animate-pulse" />
        </div>
      </div>

      <section className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(153,0,0,0.15)_0%,transparent_70%)]" />

        <div className="relative z-10 w-full flex flex-col items-center gap-4 px-6">
          <div className="h-[11vw] w-[70%] max-w-4xl rounded-lg bg-white/10 animate-pulse" />
          <div className="h-[11vw] w-[55%] max-w-3xl rounded-lg bg-white/5 animate-pulse" />
        </div>

        <div className="absolute bottom-0 z-[5] w-full h-[65vh] md:h-[85vh] flex justify-center items-end">
          <div className="h-full w-[45%] max-w-md rounded-t-[100px] bg-white/5 animate-pulse" />
        </div>
      </section>

      <section className="bg-[#eeeeee] rounded-t-[80px] md:rounded-t-[120px] -mt-24 px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-16 lg:gap-28">
          <div className="space-y-8">
            <div className="h-4 w-32 rounded bg-black/10 animate-pulse" />
            <div className="h-16 w-56 rounded bg-black/10 animate-pulse" />
            <div className="space-y-4 pt-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-10 rounded bg-black/5 animate-pulse" />
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <div className="h-4 w-full rounded bg-black/10 animate-pulse" />
            <div className="h-4 w-11/12 rounded bg-black/5 animate-pulse" />
            <div className="h-4 w-4/5 rounded bg-black/5 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="h-40 rounded-[40px] bg-black/5 animate-pulse" />
              <div className="h-40 rounded-[40px] bg-black/5 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
