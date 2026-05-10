export default function HeroSection() {
 return (
    <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 grid lg:grid-cols-2 gap-14 items-center overflow-hidden">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6 backdrop-blur-sm animate-pulse">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></span>
          🔥 Trending Anime Platform
        </div>

        <h2 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent animate-gradient">
          Discover The World Of
          <span className="block text-purple-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">Anime</span>
        </h2>

        <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-xl">
          Build your anime platform with your own API and dynamic content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30">
            Explore Now
          </button>
          <button className="px-8 py-4 rounded-2xl border border-white/20 hover:border-purple-500/40 text-white hover:bg-purple-500/10 font-semibold transition-all transform hover:scale-105">
            Watch Trailer
          </button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-[2rem] blur-3xl group-hover:blur-3xl transition-all duration-500 animate-pulse"></div>
        <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-zinc-900/80 to-purple-900/20 h-[600px] flex flex-col items-center justify-center text-zinc-400 overflow-hidden backdrop-blur-xl hover:border-purple-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
          <div className="relative z-10 text-center space-y-6 p-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-spin-slow">
              <span className="text-4xl">🎌</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">Featured Anime</h3>
              <p className="text-zinc-400">Experience the best of Japanese animation</p>
            </div>
            <div className="flex justify-center gap-4">
              <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">HD Quality</div>
              <div className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-sm">New Episodes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}