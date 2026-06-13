import { useParams } from "react-router-dom";

export default function OneAnime({ topAnime }) {
  const { id } = useParams();

  const anime = topAnime?.find((a) => a.mal_id === parseInt(id));

  const toHomePage = () => {
    window.location.href = "/";
  };

  if (!anime) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">

      {/* BACK BUTTON */}
      <button
        onClick={toHomePage}
        className="fixed top-4 left-4 z-50 bg-black/70 px-4 py-2 rounded-full backdrop-blur-xl transition-all duration-300 hover:bg-black/90 hover:scale-105"
      >
        ← Back
      </button>

      {/* HERO */}
      <section className="relative h-105 sm:h-125 md:h-150 mr-3.5">

        <img
          src="/allAnime.png"  
          alt="all Anime"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />

        <div className="absolute bottom-6 sm:bottom-10 inset-x-0 px-4">
          <div className="max-w-6xl mx-auto">

            {/* MOBILE + DESKTOP (clean unified layout) */}
            <div className="flex flex-col md:flex-row md:items-end gap-6 items-center text-center md:text-left">

              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-32 sm:w-40 md:w-56 rounded-2xl border-4 border-zinc-900 shadow-2xl"
              />

              <div className="space-y-3 w-full">

                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="bg-emerald-600 px-3 py-1 rounded-full text-xs sm:text-sm">
                    {anime.status}
                  </span>

                  {anime.year && (
                    <span className="bg-zinc-800 px-3 py-1 rounded-full text-xs sm:text-sm">
                      {anime.year}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold break-words px-2 md:px-0">
                  {anime.title}
                </h1>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-zinc-300 text-sm sm:text-base">
                  <span>⭐ {anime.score}</span>
                  <span>{anime.type}</span>
                  <span>{anime.episodes} Episodes</span>
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            <div className="flex gap-3">
              <button className="flex-1 bg-violet-600 hover:bg-violet-500 transition py-3 sm:py-4 rounded-2xl font-semibold">
                ▶ Watch Now
              </button>

              <button className="w-12 sm:w-14 bg-zinc-800 hover:bg-zinc-700 rounded-2xl">
                +
              </button>
            </div>

            {/* SYNOPSIS */}
            <div className="bg-zinc-900/70 p-5 sm:p-7 rounded-3xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Synopsis
              </h2>

              <p className="text-zinc-300 leading-7 sm:leading-8 text-sm sm:text-base break-words">
                {anime.synopsis}
              </p>
            </div>

            {/* GENRES */}
            <div className="bg-zinc-900/70 p-5 sm:p-7 rounded-3xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                Genres
              </h2>

              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="px-4 py-1 bg-zinc-800 rounded-full text-sm border border-zinc-700"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* DETAILS */}
            <div className="bg-zinc-900/70 rounded-3xl p-5 sm:p-7">

              <h2 className="text-lg sm:text-xl font-bold mb-5">
                Details
              </h2>

              <div className="space-y-4 text-sm sm:text-base">

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-400">Status</span>
                  <span className="text-right">{anime.status}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-400">Episodes</span>
                  <span>{anime.episodes}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-400">Year</span>
                  <span>{anime.year || "Unknown"}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-zinc-400">Type</span>
                  <span>{anime.type}</span>
                </div>

              </div>
            </div>

            {/* EPISODES */}
            <div className="bg-zinc-900/70 rounded-3xl p-5 sm:p-7">

              <h2 className="text-lg sm:text-xl font-bold mb-4">
                Episodes
              </h2>

              <div className="scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent space-y-3 max-h-75 sm:max-h-100 overflow-y-auto pr-1">

                {Array.from({ length: anime.episodes || 1 }, (_, i) => (
                  <div
                    key={i}
                    className="bg-zinc-950 hover:bg-zinc-800 transition rounded-2xl p-3 sm:p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-violet-600/20 text-violet-400 rounded-xl flex items-center justify-center">
                        {i + 1}
                      </div>

                      <span className="text-sm sm:text-base">
                        Episode {i + 1}
                      </span>
                    </div>

                    <span className="text-sm">▶</span>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}