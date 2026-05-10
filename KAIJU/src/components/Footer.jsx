export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-5">
        <div>
          <h2 className="text-2xl font-black tracking-[0.3em] text-purple-400">
            KAIJU
          </h2>
          <p className="text-zinc-500 text-sm mt-2">
            Built by Kareem • Made for anime lovers ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}