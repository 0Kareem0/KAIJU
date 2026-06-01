import { useState } from "react";
export default function Manga({topManga}) {
const [liked, setLiked] = useState(false);
  console.log(topManga);
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
          {topManga.map((manga) => (
          <div key={manga.mal_id} className="group rounded-3xl overflow-hidden bg-zinc-900/70 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2 flex flex-col">
            <div className="relative h-72 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              
              <img
                src={manga.images?.jpg?.image_url}
                alt="Jujutsu Kaisen"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
              />

          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full">
            <span className="text-yellow-400 text-base sm:text-lg">⭐</span>
            <span className="text-white text-xs sm:text-sm font-semibold">
              {manga.score || "?"}
            </span>
          </div>
          <button
              onClick={(e) => {
                e.stopPropagation();  
                setLiked(!liked);
            }}
            className="p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-gray-700/80 transition-all hover:scale-110 active:scale-90"
          >
            <span className="text-xl sm:text-2xl transition-transform">
              {liked ? "❤️" : "🤍"}
            </span>
          </button>
        </div>


              <div className="absolute top-3 right-3 z-20 bg-purple-600/90 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide">
                {manga.type}
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h3 className="text-base font-bold line-clamp-2 group-hover:text-purple-300 transition">
                {manga.title}
              </h3>

              <div className="flex items-center justify-between mt-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-green-400">{manga.status}</span>
                </div>
                <span className="text-zinc-500">{manga.chapters || "?"} Chapters</span>
              </div>

              <div className="flex gap-2 mt-auto pt-5">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 transition py-3 rounded-2xl text-sm font-semibold">
                  Start Reading
                </button>
                <button className="w-11 rounded-2xl border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 transition text-xl">
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