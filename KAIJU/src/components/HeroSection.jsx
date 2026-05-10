export default function HeroSection() {
 return (
    <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 grid lg:grid-cols-2 gap-14 items-center">
      <div>
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6">
          🔥 Trending Anime Platform
        </span>

        <h2 className="text-5xl md:text-7xl font-black leading-tight">
          Discover The World Of
          <span className="block text-purple-400">Anime</span>
        </h2>

        <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-xl">
          Build your anime platform with your own API and dynamic content.
        </p>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-zinc-900/50 h-[600px] flex items-center justify-center text-zinc-500 text-xl">
        Hero Image / Featured Anime
      </div>
    </section>
  );
}