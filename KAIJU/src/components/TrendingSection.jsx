import AnimeCard from "./AnimeCard";

export default function TrendingSection({ topAnime }) {
  return (
    <section id="trending" className="max-w-7xl mx-auto px-6 pb-24">
      <section id="manga" className="py-20 scroll-mt-20"></section>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm mb-4">
            🔥 Trending Anime
          </div>

          <h2 className="text-4xl md:text-5xl font-black bg-linear-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Trending Now
          </h2>

          <p className="text-zinc-400 mt-3 text-lg max-w-md">
            Top Anime everyone is watching right now 
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topAnime.slice(0, topAnime.length).map((anime) => (
          <AnimeCard key={anime.mal_id} item={anime} />
        ))}
      </div>
    </section>
  );
}
