import AnimeCard from "./AnimeCard";

export default function TrendingSection({
  topAnime = [],
  searchResults = [],
  searchQuery = "",
  isSearching = false,
  onClearSearch,
}) {
  const isSearchActive = Boolean(searchQuery.trim());
  const animeList = isSearchActive ? searchResults : topAnime;

  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs sm:text-sm mb-3">
            {isSearchActive ? "🔍 Search Mode" : "🔥 Top Anime Releases"}
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            {isSearchActive ? `Results for "${searchQuery}"` : "Trending Now"}
          </h2>

          <p className="text-zinc-400 mt-2 text-xs sm:text-base max-w-md">
            {isSearchActive
              ? `Showing search results matching your query.`
              : "The most popular anime series everyone is watching right now."}
          </p>
        </div>

        {isSearchActive && (
          <button
            onClick={onClearSearch}
            className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/15 hover:border-purple-500/40 text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white transition-all active:scale-95 flex items-center gap-2 self-start sm:self-auto"
          >
            <span>✖ Clear Search</span>
          </button>
        )}
      </div>

      {isSearching ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-400 text-sm">Searching for "{searchQuery}"...</p>
        </div>
      ) : animeList.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {animeList.map((anime) => (
            <AnimeCard key={anime.mal_id} item={anime} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-zinc-500 text-sm bg-zinc-900/40 rounded-3xl border border-white/5">
          <p className="text-base font-semibold text-zinc-400 mb-1">No anime found matching "{searchQuery}"</p>
          <p className="text-xs text-zinc-500">Try searching for another title or keyword.</p>
        </div>
      )}
    </section>
  );
}


