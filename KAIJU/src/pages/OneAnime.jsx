import { useParams } from "react-router-dom";

export default function OneAnime({ topAnime }) {
  const { id } = useParams();

  const anime = topAnime?.find(
    (a) => a.mal_id === parseInt(id)
  );

  const toHomePage = () => {
    window.location.href = "/";
  };

  if (!anime) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* BACK BUTTON */}
      <button
        onClick={toHomePage}
        className="fixed top-4 left-4 z-50 bg-black/70 backdrop-blur-xl px-4 py-2 rounded-full hover:bg-black transition"
      >
        ← Back
      </button>

      {/* HERO */}
      <section className="relative h-[450px] md:h-[550px] overflow-hidden">

        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-7xl px-5">

          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">

            {/* POSTER */}
            <img
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              className="
              w-36
              sm:w-44
              md:w-60
              rounded-3xl
              border-4
              border-zinc-900
              shadow-2xl
              object-cover
              md:-mb-10
              "
            />

            {/* INFO */}
            <div className="pb-2 md:pb-10">

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">

                <span className="bg-emerald-600 px-4 py-1 rounded-full text-sm">
                  {anime.status}
                </span>

                {anime.year && (
                  <span className="bg-zinc-800 px-4 py-1 rounded-full text-sm">
                    {anime.year}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-6xl font-bold mb-4">
                {anime.title}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-5 text-zinc-300">

                <span>
                  ⭐ {anime.score}
                </span>

                <span>
                  {anime.type}
                </span>

                <span>
                  {anime.episodes} Episodes
                </span>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 pt-14 pb-14">

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2">

            {/* BUTTONS */}
            <div className="flex gap-4 mb-8">

              <button className="flex-1 bg-violet-600 hover:bg-violet-500 transition py-4 rounded-2xl font-semibold">
                ▶ Watch Now
              </button>

              <button className="bg-zinc-800 hover:bg-zinc-700 px-6 rounded-2xl">
                +
              </button>

            </div>

            {/* SYNOPSIS */}
            <div className="bg-zinc-900/60 backdrop-blur-xl p-7 rounded-3xl mb-8">

              <h2 className="text-2xl font-bold mb-5">
                Synopsis
              </h2>

              <p className="text-zinc-300 leading-8">
                {anime.synopsis}
              </p>

            </div>

            {/* GENRES */}
            <div className="bg-zinc-900/60 backdrop-blur-xl p-7 rounded-3xl">

              <h2 className="text-2xl font-bold mb-5">
                Genres
              </h2>

              <div className="flex gap-3 overflow-x-auto">

                {anime.genres.map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="
                    whitespace-nowrap
                    px-5
                    py-2
                    rounded-full
                    bg-zinc-800
                    border
                    border-zinc-700
                    hover:border-violet-500
                    transition
                    "
                  >
                    {genre.name}
                  </span>
                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-8 lg:sticky lg:top-8 h-fit">

            {/* DETAILS */}
            <div className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-7">

              <h2 className="text-xl font-bold mb-6">
                Details
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between">
                  <span className="text-zinc-400">Status</span>
                  <span>{anime.status}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Episodes</span>
                  <span>{anime.episodes}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Year</span>
                  <span>{anime.year || "Unknown"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-400">Type</span>
                  <span>{anime.type}</span>
                </div>

              </div>

            </div>

            {/* EPISODES */}
            <div className="bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-7">

              <h2 className="text-xl font-bold mb-5">
                Episodes
              </h2>

              <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent space-y-3">

                {Array.from(
                  { length: anime.episodes || 1 },
                  (_, i) => (
                    <div
                      key={i}
                      className="
                      flex
                      justify-between
                      items-center
                      bg-zinc-950
                      hover:bg-zinc-800
                      transition
                      p-4
                      rounded-2xl
                      cursor-pointer              
                      "
                    >
                      <div className="flex items-center gap-4">

                        <div className="
                        w-10 h-10
                        rounded-xl
                        bg-violet-600/20
                        text-violet-400
                        flex justify-center items-center
                        ">
                          {i + 1}
                        </div>

                        Episode {i + 1}

                      </div>

                      ▶

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}