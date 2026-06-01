export default function Manga({topManga = []}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          {/* LOGO */}
          <h1 className="text-3xl font-black tracking-wide">
            <span className="text-purple-500">K</span>AIJU
          </h1>

          {/* LINKS */}
          <div className="flex items-center gap-6 text-sm md:text-base">
            <a href="/" className="hover:text-purple-400 transition">Home</a>
            <a className="hover:text-purple-400 transition">Trending</a>
            <a className="hover:text-purple-400 transition">Genres</a>
            <a className="hover:text-purple-400 transition">Top Rated</a>
          </div>
        </div>
      </nav>

      {/* HERO + SEARCH */}
      <section className="relative px-6 md:px-12 pt-16 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-700/20 blur-[140px] rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[6px] text-purple-400 text-sm mb-4">
            Discover the Best
          </p>
          
          <h1 className="text-6xl md:text-7xl font-black leading-none mb-6">
            Trending Manga
          </h1>

          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Explore epic stories, legendary characters, and hidden gems from the manga world.
          </p>

          {/* Search Bar */}
          <div className="mt-10 flex items-center bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search manga, author, or genre..."
              className="w-full bg-transparent px-6 py-4 outline-none placeholder:text-zinc-500 text-base"
            />
            <button className="bg-purple-600 hover:bg-purple-700 transition px-10 py-4 font-semibold whitespace-nowrap">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* MANGA GRID SECTION */}
      <section className="px-6 md:px-12 pb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl md:text-4xl font-black">Trending Now</h2>
          <a href="#" className="text-purple-400 hover:text-purple-300 transition text-sm flex items-center gap-1">
            View All <span className="text-lg leading-none">→</span>
          </a>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6">

          {/* Cards */}

          


        </div>
      </section>
    </div>
  );
}