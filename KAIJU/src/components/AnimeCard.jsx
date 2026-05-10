export default function AnimeCard() {
return (
    <div className="group rounded-3xl overflow-hidden bg-zinc-900/70 border border-white/5 hover:border-purple-500/40 transition-all hover:-translate-y-2">
      <div className="h-72 bg-zinc-800 flex items-center justify-center text-zinc-500">
        Anime Image
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold">Anime Title</h3>
        <p className="text-zinc-500 text-sm mt-2">Genre • Type</p>

        <button className="mt-5 w-full py-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-300 hover:bg-purple-500 hover:text-white transition-all font-medium">
          Add To Watchlist
        </button>
      </div>
    </div>
  );
}