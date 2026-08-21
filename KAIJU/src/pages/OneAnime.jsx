import { useParams, useNavigate } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OneAnime({ topAnime = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const anime = topAnime?.find((a) => a.mal_id === parseInt(id));

  if (!anime) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-4">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-zinc-400 text-sm">Loading Anime details...</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-xs text-white"
        >
          ← Back to Home
        </button>
      </div>
    );
  }

  const bgImage =
    anime.images?.jpg?.large_image_url ||
    anime.images?.jpg?.image_url ||
    "/allAnime.png";

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col overflow-x-hidden">
      <Navbar />

      {/* HERO COVER BANNER */}
      <section className="relative min-h-[380px] sm:min-h-[460px] flex items-end">
        {/* Background Cover Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={bgImage}
            alt={anime.title}
            className="w-full h-full object-cover blur-md opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        {/* Floating Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 transition-all active:scale-95 shadow-lg"
        >
          <span>←</span> Back
        </button>

        {/* Hero Header Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-6 sm:pb-10 pt-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 sm:gap-8 text-center sm:text-left">
            <img
              src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
              alt={anime.title}
              className="w-36 sm:w-48 md:w-56 rounded-2xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 shrink-0 aspect-[3/4] object-cover"
            />

            <div className="space-y-3 w-full">
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-0.5 rounded-full text-xs font-semibold">
                  {anime.status || "Completed"}
                </span>

                {anime.year && (
                  <span className="bg-zinc-800/80 border border-white/10 px-3 py-0.5 rounded-full text-xs text-zinc-300">
                    {anime.year}
                  </span>
                )}
                
                {anime.type && (
                  <span className="bg-purple-600/30 text-purple-300 border border-purple-500/30 px-3 py-0.5 rounded-full text-xs font-bold uppercase">
                    {anime.type}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                {anime.title}
              </h1>

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-zinc-300 text-xs sm:text-sm pt-1">
                {anime.score && (
                  <span className="flex items-center gap-1 font-bold text-yellow-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/10">
                    ⭐ {anime.score}
                  </span>
                )}
                <span>{anime.episodes || "?"} Episodes</span>
                {anime.rating && <span>Rating: {anime.rating.split(" ")[0]}</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAIL CONTENT */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* MAIN LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 sm:py-4 rounded-2xl shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98] text-sm sm:text-base flex items-center justify-center gap-2">
                <span>▶ Watch Episode 1</span>
              </button>

              <button
                aria-label="Add to Watchlist"
                className="w-12 sm:w-14 bg-zinc-900 border border-white/10 hover:border-purple-500/40 rounded-2xl flex items-center justify-center font-bold text-xl hover:bg-zinc-800 transition-all active:scale-95"
              >
                +
              </button>
            </div>

            {/* SYNOPSIS */}
            <div className="bg-zinc-900/60 border border-white/10 p-5 sm:p-7 rounded-2xl sm:rounded-3xl backdrop-blur-xl">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
                <span>📖</span> Synopsis
              </h2>

              <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm md:text-base">
                {anime.synopsis || "No synopsis available for this title."}
              </p>
            </div>

            {/* GENRES */}
            {anime.genres?.length > 0 && (
              <div className="bg-zinc-900/60 border border-white/10 p-5 sm:p-7 rounded-2xl sm:rounded-3xl backdrop-blur-xl">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <span>🏷️</span> Genres
                </h2>

                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="px-3.5 py-1.5 bg-zinc-800/80 hover:bg-purple-600/20 hover:text-purple-300 text-zinc-300 text-xs sm:text-sm font-medium rounded-full border border-white/10 transition-colors"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* DETAILS METADATA */}
            <div className="bg-zinc-900/60 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 backdrop-blur-xl">
              <h2 className="text-base sm:text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">
                Information
              </h2>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Status</span>
                  <span className="text-emerald-400 font-semibold">{anime.status}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total Episodes</span>
                  <span className="font-semibold">{anime.episodes || "Unknown"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Release Year</span>
                  <span className="font-semibold">{anime.year || "N/A"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Format</span>
                  <span className="font-semibold">{anime.type}</span>
                </div>

                {anime.duration && (
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Duration</span>
                    <span className="font-semibold text-zinc-300">{anime.duration}</span>
                  </div>
                )}
              </div>
            </div>

            {/* EPISODE LIST */}
            <div className="bg-zinc-900/60 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 backdrop-blur-xl">
              <h2 className="text-base sm:text-lg font-bold text-white mb-3">
                Episode List
              </h2>

              <div className="no-scrollbar space-y-2 max-h-72 sm:max-h-96 overflow-y-auto pr-1">
                {Array.from({ length: Math.min(anime.episodes || 12, 24) }, (_, i) => (
                  <div
                    key={i}
                    className="bg-zinc-950/80 hover:bg-purple-600/20 border border-white/5 hover:border-purple-500/30 transition-all rounded-xl p-3 flex justify-between items-center cursor-pointer group active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-xs flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-zinc-200 group-hover:text-white">
                        Episode {i + 1}
                      </span>
                    </div>

                    <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ▶ Play
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

