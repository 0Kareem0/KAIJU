export default function Navbar() {
return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-[0.3em] text-purple-400">
            KAIJU
          </h1>
          <p className="text-xs text-zinc-500 uppercase tracking-[0.25em] mt-1">
            Anime Platform
          </p>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
          <a href="#" className="hover:text-purple-400 transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-purple-400 transition-colors">
            Trending
          </a>
          <a href="#" className="hover:text-purple-400 transition-colors">
            Genres
          </a>
          <a href="#" className="hover:text-purple-400 transition-colors">
            Favorites
          </a>
        </nav>

        <button className="px-5 py-2 rounded-full bg-purple-500 hover:bg-purple-400 transition-all font-medium shadow-lg shadow-purple-500/30">
          Sign In
        </button>
      </div>
    </header>
  );
}