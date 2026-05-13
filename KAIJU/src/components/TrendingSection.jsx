import AnimeCard from "./AnimeCard";

export default function TrendingSection({data}) {
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
        <AnimeCard data={data[0]} />
        <AnimeCard data={data[1]} />
        <AnimeCard data={data[2]} />
        <AnimeCard data={data[3]} />
      </div>
    </section>
  );
}