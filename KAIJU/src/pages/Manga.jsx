import { useState } from "react";

export default function Manga({ topManga }) {
const [likedIds, setLikedIds] = useState(new Set());

  const toggleLike = (id) => {
    setLikedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  return (
    <div className="min-h-screen bg-black text-white">
      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-black tracking-wide">
            <span className="text-purple-500">K</span>AIJU
          </h1>

          <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm md:text-base">
            <a href="/" className="hover:text-purple-400 transition">Home</a>
            <a className="hover:text-purple-400 transition">Trending</a>
            <a className="hover:text-purple-400 transition">Genres</a>
            <a className="hover:text-purple-400 transition">Top Rated</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-4 sm:px-6 md:px-12 pt-10 sm:pt-16 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-purple-700/20 blur-[120px] sm:blur-[140px] rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="uppercase tracking-[4px] sm:tracking-[6px] text-purple-400 text-xs sm:text-sm mb-3 sm:mb-4">
            Discover the Best
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight mb-4 sm:mb-6">
            Trending Manga
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            Explore epic stories, legendary characters, and hidden gems from the manga world.
          </p>

          {/* SEARCH */}
          <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center bg-zinc-900 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search manga..."
              className="w-full bg-transparent px-4 sm:px-6 py-3 sm:py-4 outline-none placeholder:text-zinc-500 text-sm sm:text-base"
            />
            <button className="bg-purple-600 hover:bg-purple-700 transition px-6 sm:px-10 py-3 sm:py-4 font-semibold">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="px-4 sm:px-6 md:px-12 pb-20 sm:pb-24">
        <div className="flex items-center justify-between mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
            Trending Now
          </h2>

          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 transition text-xs sm:text-sm flex items-center gap-1"
          >
            View All <span>→</span>
          </a>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-6">
          {topManga.map((manga) => (
            <div
              key={manga.mal_id}
              className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900/70 border border-white/5 hover:border-purple-500/30 transition flex flex-col"
            >
              <div className="relative h-44 sm:h-64 md:h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                <img
                  src={manga.images?.jpg?.image_url}
                  alt={manga.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* INFO OVERLAY */}
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center z-20">
                  <div className="flex items-center gap-1 bg-black/70 px-2 py-1 rounded-full">
                    <span className="text-yellow-400 text-sm">⭐</span>
                    <span className="text-white text-xs">
                      {manga.score || "?"}
                    </span>
                  </div>

                  <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(manga.mal_id);
                      }}
                      className="p-2 rounded-full bg-black/70 hover:bg-gray-700/80 active:scale-90 transition-all"
                    >
                      <span className="text-xl transition-transform">
                        {likedIds.has(manga.mal_id) ? "❤️" : "🤍"}
                      </span>
                    </button>
                </div>

                <div className="absolute top-2 right-2 z-20 bg-purple-600/90 px-2 py-1 rounded-full text-[9px] sm:text-[10px]">
                  {manga.type}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <h3 className="text-sm sm:text-base font-bold line-clamp-2 group-hover:text-purple-300">
                  {manga.title}
                </h3>

                <div className="flex items-center justify-between mt-2 sm:mt-3 text-[10px] sm:text-xs">
                  <span className="text-green-400">{manga.status}</span>
                  <span className="text-zinc-500">
                    {manga.chapters || "?"} ch
                  </span>
                </div>

                <div className="flex gap-2 mt-auto pt-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold">
                    Start Reading
                  </button>

                  <button className="w-10 sm:w-11 rounded-xl sm:rounded-2xl border border-white/10 text-lg">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}