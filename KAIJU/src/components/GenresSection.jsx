import GenreButton from "./GenreButton";

export default function GenresSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="rounded-[2rem] border border-white/10 bg-zinc-900/60 p-8 md:p-12 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold">Browse By Genre</h2>
            <p className="text-zinc-500 mt-2 max-w-xl">
              Genre buttons structure.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <GenreButton title="Action" />
            <GenreButton title="Fantasy" />
            <GenreButton title="Drama" />
            <GenreButton title="Comedy" />
          </div>
        </div>
      </div>
    </section>
  );
}