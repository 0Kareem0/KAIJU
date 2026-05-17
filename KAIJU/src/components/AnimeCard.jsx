import { useState } from "react";

export default function AnimeCard({topAnime}) {
  const [like, setLike] = useState("🤍");

return (
    <div className="group rounded-3xl overflow-hidden bg-zinc-900/70 border border-white/5 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="relative h-72 bg-linear-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-500 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src={topAnime.images?.jpg?.image_url} alt={topAnime.title} />
        </div>
   
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="flex items-center gap-2 bg-black/70 px-2 py-1 rounded-full">
            <span className="text-yellow-400 ">⭐</span>
            <span className="text-white text-sm font-semibold">{topAnime.score}</span>
          </div>
          <button className="p-2 rounded-full bg-black/70 hover:bg-gray-700/50 transition-colors hover:scale-110">
            <span
            onClick={() => {  
              setLike(like === "🤍" ? "❤️" : "🤍");
            }}
            className="text-white">{like}</span>
          </button>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors truncate">{topAnime.title}</h3>
          <p className="text-zinc-500 text-sm mt-2 truncate">{topAnime.genres?.map((genre) => genre.name).join(", ")}</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-green-400">{topAnime.status}</span>
          </div>
          <span className="text-zinc-400">{topAnime.episodes} Episodes</span>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold transition-all transform hover:scale-105">
            Watch Now
          </button>
          <button className="p-3 rounded-2xl border border-white/10 hover:border-purple-500/40 text-white hover:bg-purple-500/10 transition-all transform hover:scale-105">
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  );
}