import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnimeCard({ item }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  if (!item) return null;

  const isManga = item.type === "Manga" || item.chapters !== undefined;

  const toAnimePage = () => {
    navigate(`/oneAnime/${item.mal_id}`);
  };

  return (
    <div id="trending"
      onClick={toAnimePage}
      className="group rounded-3xl overflow-hidden bg-zinc-900/70 border border-white/5 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20 flex flex-col h-full cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent z-10" />

        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={
            item.images?.jpg?.image_url ||
            item.images?.webp?.image_url ||
            "/placeholder.jpg"
          }
          alt={item.title || "Cover"}
        />

        {/* Score + Like - Always visible on mobile, hover on desktop */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-20 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full">
            <span className="text-yellow-400 text-base sm:text-lg">⭐</span>
            <span className="text-white text-xs sm:text-sm font-semibold">
              {item.score || "?"}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-gray-700/80 transition-all hover:scale-110 active:scale-90"
          >
            <span className="text-xl sm:text-2xl transition-transform">
              {liked ? "❤️" : "🤍"}
            </span>
          </button>
        </div>
      </div>

      {/* Content - Much more compact */}
      <div className="flex-1 flex flex-col p-3 sm:p-4 pt-4 sm:pt-5">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-tight">
          {item.title || "Untitled"}
        </h3>

        {/* Genres */}
        <p className="text-zinc-500 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-snug">
          {item.genres?.map((g) => g.name).join(", ") ||
            item.type ||
            "No genres"}
        </p>

        {/* Status + Chapters */}
        <div className="flex items-center justify-between text-xs sm:text-sm mt-2 sm:mt-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400 font-medium">
              {item.status || "Unknown"}
            </span>
          </div>

          <span className="text-zinc-400 text-xs sm:text-sm">
            {isManga
              ? item.chapters
                ? `${item.chapters} Chapters`
                : "Manga"
              : item.episodes
                ? `${item.episodes} Episodes`
                : "Anime"}
          </span>
        </div>

        {/* Buttons - Tight spacing */}
        <div className="flex gap-2 mt-auto pt-3 sm:pt-5">
          <button className="flex-1 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold transition-all active:scale-[0.97] text-sm sm:text-base">
            {isManga ? "Read Now" : "Watch Now"}
          </button>
          <button className="p-2.5 sm:p-3 rounded-2xl border border-white/10 hover:border-purple-500/40 text-white hover:bg-purple-500/10 transition-all active:scale-[0.97]">
            <span className="text-lg sm:text-xl">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}
