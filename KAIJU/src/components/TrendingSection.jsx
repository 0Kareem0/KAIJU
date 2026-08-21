import AnimeCard from "./AnimeCard";

export default function TrendingSection({ topAnime = [] }) {
  const animeList = Array.isArray(topAnime) ? topAnime : [];

  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16 sm:pb-24 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs sm:text-sm mb-3">
            🔥 Top Anime Releases
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Trending Now
          </h2>

          <p className="text-zinc-400 mt-2 text-xs sm:text-base max-w-md">
            The most popular anime series everyone is watching right now.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {animeList.map((anime) => (
          <AnimeCard key={anime.mal_id} item={anime} />
        ))}
      </div>
    </section>
  );
}

