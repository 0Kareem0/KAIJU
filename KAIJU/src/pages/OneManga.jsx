import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function OneManga({ topManga = [], onSearch }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mangaData, setMangaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadManga = async () => {
      setLoading(true);
      setError(null);

      // 1. First check if it exists in topManga prop
      const foundInProps = topManga?.find((a) => a.mal_id === parseInt(id));
      if (foundInProps && foundInProps.synopsis) {
        if (isMounted) {
          setMangaData(foundInProps);
          setLoading(false);
        }
        return;
      }

      // 2. Otherwise fetch from Jikan API with rate-limit retry
      let retries = 3;
      let delay = 1000;

      while (retries > 0) {
        try {
          const res = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
          if (res.status === 429) {
            // Rate limited, wait and retry
            await new Promise((resolve) => setTimeout(resolve, delay));
            delay *= 1.5;
            retries--;
            continue;
          }
          if (!res.ok) throw new Error(`Server returned status: ${res.status}`);
          const result = await res.json();
          if (isMounted) {
            setMangaData(result.data);
            setLoading(false);
          }
          return;
        } catch (err) {
          retries--;
          if (retries === 0) {
            if (foundInProps) {
              if (isMounted) {
                setMangaData(foundInProps);
                setLoading(false);
              }
              return;
            }
            if (isMounted) {
              setError("Failed to load manga details. Please try again.");
              setLoading(false);
            }
          } else {
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }
    };

    loadManga();

    return () => {
      isMounted = false;
    };
  }, [id, topManga]);

  const manga = mangaData;

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4 shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>
        <p className="text-zinc-400 text-sm font-medium">Loading Manga details...</p>
        <button
          onClick={() => navigate("/manga")}
          className="mt-6 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-2xl text-xs font-bold text-white transition-all"
        >
          ← Back to Manga Hub
        </button>
      </div>
    );
  }

  if (error || !manga) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center text-white p-4">
        <div className="text-4xl mb-3">⚠️</div>
        <p className="text-zinc-300 text-base font-bold mb-2">Unable to load Manga details</p>
        <p className="text-zinc-500 text-xs mb-6 text-center max-w-sm">{error || "Data unavailable from the Jikan API right now."}</p>
        <div className="flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-2xl text-xs font-bold transition-all shadow-md"
          >
            Retry Loading
          </button>
          <button
            onClick={() => navigate("/manga")}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white rounded-2xl text-xs font-bold transition-all"
          >
            Back to Manga Hub
          </button>
        </div>
      </div>
    );
  }

  const bgImage =
    manga.images?.jpg?.large_image_url ||
    manga.images?.jpg?.image_url ||
    "/allAnime.png";

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col overflow-x-hidden">
      <Navbar onSearch={onSearch} />

      {/* HERO COVER BANNER */}
      <section className="relative min-h-[400px] sm:min-h-[480px] flex items-end">
        {/* Background Blur Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={bgImage}
            alt={manga.title}
            className="w-full h-full object-cover blur-xl opacity-35 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-bold text-white flex items-center gap-2 transition-all active:scale-95 shadow-xl hover:border-purple-500/40"
        >
          <span>←</span> Back
        </button>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-6 sm:pb-10 pt-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8 text-center sm:text-left">
            <img
              src={manga.images?.jpg?.large_image_url || manga.images?.jpg?.image_url}
              alt={manga.title}
              className="w-40 sm:w-52 md:w-60 rounded-3xl border-2 border-purple-500/40 shadow-2xl shadow-purple-500/30 shrink-0 aspect-[3/4] object-cover"
            />

            <div className="space-y-3.5 w-full">
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3.5 py-1 rounded-full text-xs font-bold">
                  {manga.status || "Publishing"}
                </span>

                {manga.year && (
                  <span className="bg-zinc-900/90 border border-white/10 px-3.5 py-1 rounded-full text-xs text-zinc-300 font-semibold backdrop-blur-md">
                    {manga.year}
                  </span>
                )}

                {manga.type && (
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                    {manga.type}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent">
                {manga.title}
              </h1>

              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 text-zinc-300 text-xs sm:text-sm pt-1">
                {manga.score && (
                  <span className="flex items-center gap-1.5 font-bold text-yellow-400 bg-black/60 px-3 py-1 rounded-xl border border-white/15 backdrop-blur-md">
                    ⭐ {manga.score}
                  </span>
                )}
                <span className="font-medium">{manga.chapters ? `${manga.chapters} Chapters` : "Ongoing"}</span>
                {manga.volumes && <span className="font-medium">{manga.volumes} Volumes</span>}
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
              <button className="flex-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 sm:py-4 rounded-2xl shadow-xl shadow-purple-500/30 transition-all active:scale-[0.98] text-sm sm:text-base flex items-center justify-center gap-2">
                <span>📖 Read Chapter 1</span>
              </button>

              <button
                aria-label="Add to Library"
                className="w-12 sm:w-14 bg-zinc-900 border border-white/15 hover:border-purple-500/40 rounded-2xl flex items-center justify-center font-bold text-xl hover:bg-zinc-800 transition-all active:scale-95 text-white shadow-md"
              >
                +
              </button>
            </div>

            {/* SYNOPSIS */}
            <div className="bg-zinc-900/70 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-2xl shadow-xl">
              <h2 className="text-lg sm:text-2xl font-black text-white mb-3 flex items-center gap-2">
                <span>📖</span> Synopsis
              </h2>

              <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm md:text-base font-normal">
                {manga.synopsis || "No synopsis available for this manga title."}
              </p>
            </div>

            {/* GENRES */}
            {manga.genres?.length > 0 && (
              <div className="bg-zinc-900/70 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-2xl shadow-xl">
                <h2 className="text-lg sm:text-2xl font-black text-white mb-3 flex items-center gap-2">
                  <span>🏷️</span> Genres
                </h2>

                <div className="flex flex-wrap gap-2.5">
                  {manga.genres.map((genre) => (
                    <span
                      key={genre.mal_id}
                      className="px-4 py-1.5 bg-zinc-800/80 hover:bg-purple-600/20 hover:text-purple-300 text-zinc-300 text-xs sm:text-sm font-semibold rounded-full border border-white/10 transition-colors"
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
            <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-2xl shadow-xl">
              <h2 className="text-base sm:text-lg font-black text-white mb-4 border-b border-white/10 pb-3">
                Manga Info
              </h2>

              <div className="space-y-3.5 text-xs sm:text-sm font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Status</span>
                  <span className="text-emerald-400 font-bold">{manga.status}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total Chapters</span>
                  <span className="font-bold text-white">{manga.chapters || "Ongoing"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total Volumes</span>
                  <span className="font-bold text-white">{manga.volumes || "N/A"}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Type</span>
                  <span className="font-bold text-purple-400">{manga.type}</span>
                </div>
              </div>
            </div>

            {/* CHAPTER LIST */}
            <div className="bg-zinc-900/70 border border-white/10 rounded-3xl p-6 sm:p-7 backdrop-blur-2xl shadow-xl">
              <h2 className="text-base sm:text-lg font-black text-white mb-4">
                Chapters
              </h2>

              <div className="no-scrollbar space-y-2 max-h-72 sm:max-h-96 overflow-y-auto pr-1">
                {Array.from({ length: Math.min(manga.chapters || 20, 30) }, (_, i) => (
                  <div
                    key={i}
                    className="bg-zinc-950/80 hover:bg-purple-600/20 border border-white/5 hover:border-purple-500/30 transition-all rounded-2xl p-3 flex justify-between items-center cursor-pointer group active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 font-bold text-xs flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white">
                        Chapter {i + 1}
                      </span>
                    </div>

                    <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      Read →
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
