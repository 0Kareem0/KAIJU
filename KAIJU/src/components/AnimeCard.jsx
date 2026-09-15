import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AnimeCard({ item }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!item) return null;

  const itemType = (item.type || "").toLowerCase();
  const isMangaType =
    itemType === "manga" ||
    itemType === "manhwa" ||
    itemType === "manhua" ||
    itemType === "light novel" ||
    itemType === "lightnovel" ||
    itemType === "novel" ||
    itemType === "one-shot" ||
    itemType === "oneshot" ||
    itemType === "doujinshi" ||
    item.chapters !== undefined ||
    item.volumes !== undefined ||
    item.authors !== undefined ||
    location.pathname.startsWith("/manga") ||
    location.pathname.startsWith("/oneManga");

  const handleClick = () => {
    if (isMangaType) {
      navigate(`/oneManga/${item.mal_id}`);
    } else {
      navigate(`/oneAnime/${item.mal_id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-900/80 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/20 flex flex-col h-full cursor-pointer active:scale-[0.98] backdrop-blur-md"
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/40 z-10 opacity-80 group-hover:opacity-60 transition-opacity" />

        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20">
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-full shadow-md">
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
            className="p-1.5 sm:p-2 rounded-full bg-black/70 backdrop-blur-md border border-white/15 hover:bg-zinc-800 transition-all active:scale-90 shadow-md"
          >
            <span className="text-sm sm:text-base leading-none block">
              {liked ? "❤️" : "🤍"}
            </span>
          </button>
        </div>

        {/* Bottom Badge: Type / Status */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-20">
          <span className="px-2.5 py-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded-md shadow-md">
            {item.type || (isMangaType ? "MANGA" : "ANIME")}
          </span>
          <span className="text-[10px] sm:text-xs text-zinc-200 font-semibold bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-white/10">
            {isMangaType
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
      <div className="flex-1 flex flex-col p-3.5 sm:p-4">
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-tight">
          {item.title || "Untitled"}
        </h3>

        <p className="text-zinc-400 text-[10px] sm:text-xs mt-1.5 line-clamp-1 leading-snug">
          {item.genres?.map((g) => g.name).join(", ") ||
            item.type ||
            "Story"}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto pt-3.5 sm:pt-4">
          <button className="flex-1 py-2 sm:py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/40">
            <span>{isMangaType ? "Read" : "Watch"}</span>
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
