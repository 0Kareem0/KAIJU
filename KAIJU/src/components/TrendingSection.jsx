import AnimeCard from "./AnimeCard";

export default function TrendingSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-bold">Trending Now</h2>
          <p className="text-zinc-500 mt-2">
            Dynamic anime cards from your API.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimeCard />
        <AnimeCard />
        <AnimeCard />
        <AnimeCard />
      </div>
    </section>
  );
}