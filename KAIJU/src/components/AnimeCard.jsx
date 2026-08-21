import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AnimeCard({ item }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  if (!item) return null;

  const isManga = item.type === "Manga" || item.chapters !== undefined;

  const handleClick = () => {
    if (isManga) {
      navigate(`/oneManga/${item.mal_id}`);
    } else {
      navigate(`/oneAnime/${item.mal_id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900/80 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-500/20 flex flex-col h-full cursor-pointer active:scale-[0.98]"
    >
      {/* Image Section */}
      <div className="relative h-44 sm:h-60 md:h-72 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30 z-10" />

        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={
            item.images?.jpg?.large_image_url ||
            item.images?.jpg?.image_url ||
            item.images?.webp?.image_url ||
            "/placeholder.jpg"
          }
          alt={item.title || "Cover"}
          loading="lazy"
        />

        {/* Top Badges: Rating & Heart */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center z-20">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
            <span className="text-yellow-400 text-xs sm:text-sm">⭐</span>
            <span className="text-white text-[11px] sm:text-xs font-bold">
              {item.score || "N/A"}
            </span>
          </div>

          <button
            aria-label="Favorite"
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="p-1.5 sm:p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-zinc-800 transition-all active:scale-90"
          >
            <span className="text-sm sm:text-base leading-none block">
              {liked ? "❤️" : "🤍"}
            </span>
          </button>
        </div>

        {/* Bottom Badge: Type / Status */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center z-20">
          <span className="px-2 py-0.5 bg-purple-600/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold uppercase rounded-md shadow">
            {item.type || (isManga ? "MANGA" : "ANIME")}
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-300 font-medium bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
            {isManga
              ? item.chapters
                ? `${item.chapters} Ch`
                : "Ongoing"
              : item.episodes
              ? `${item.episodes} Ep`
              : "Ongoing"}
          </span>
        </div>
      </div>

      {/* Card Body Content */}
      <div className="flex-1 flex flex-col p-3 sm:p-4">
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-tight">
          {item.title || "Untitled"}
        </h3>

        <p className="text-zinc-400 text-[10px] sm:text-xs mt-1 line-clamp-1 leading-snug">
          {item.genres?.map((g) => g.name).join(", ") ||
            item.type ||
            "Action"}
        </p>

        {/* Buttons */}
        <div className="flex gap-1.5 sm:gap-2 mt-auto pt-3 sm:pt-4">
          <button className="flex-1 py-2 sm:py-2.5 px-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-1 shadow-sm">
            <span>{isManga ? "Read" : "Watch"}</span>
            <span className="text-[10px] sm:text-xs">▶</span>
          </button>
          <button
            aria-label="Add to List"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-8 sm:w-10 h-8 sm:h-9 rounded-xl border border-white/15 hover:border-purple-500/40 text-white hover:bg-purple-500/10 transition-all active:scale-95 flex items-center justify-center font-bold text-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

