import { useParams } from "react-router-dom";

export default function OneAnime({topAnime}) {
  const { id } = useParams();
  const toHomePage = ()=>{
    window.location.href = `/`;
  }

  const anime = topAnime?.find(a => a.mal_id === parseInt(id));
  console.log(anime);
   
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Back Button */}
      <button onClick={toHomePage} className="fixed top-6 left-6 z-50 flex items-center gap-2 bg-black/70 hover:translate-x-1 transition-all px-5 py-3 rounded-full text-sm font-medium">
       <span className="pb-1">←</span>
       <span>Back to Home</span>
      </button>

      {/* Hero Banner */}
      <div className="relative h-[500px] w-full">
        <img src={anime?.images?.jpg?.large_image_url} alt={anime?.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            {/* Poster */}
            <img src={anime?.images?.jpg?.large_image_url} alt={anime?.title} className="w-48 md:w-64 -mb-8 md:-mb-12 rounded-2xl overflow-hidden border-4 border-zinc-900 shadow-2xl aspect-[2/3] object-cover" />
            {/* Info */}
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-emerald-600 text-xs px-3 py-1 rounded-full font-medium">
                  {anime?.status}
                </span>
                <span className="text-zinc-400 text-sm">
                  {anime?.year}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
                {anime?.title}
              </h1>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-2xl font-semibold">{anime?.score}</span>
                </div>
                <div className="text-zinc-400">{anime?.type} • {anime?.episodes} Episodes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="flex gap-3 mb-8">
              <button className="flex-1 bg-violet-600 hover:bg-violet-500 transition-all py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3">
                ▶ Watch Now
              </button>
              <button className="px-8 bg-zinc-800 hover:bg-zinc-700 transition-all rounded-2xl">
                +
              </button>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-zinc-300 leading-relaxed text-lg">
                {anime?.synopsis}
              </p>
            </div>

            {/* Genres */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-4">Genres</h3>
              <div className="flex flex-wrap gap-3">
                {anime?.genres?.map((genre) => (
                  <span key={genre.mal_id} className="bg-zinc-900 px-5 py-2 rounded-full text-sm border border-zinc-700 hover:border-violet-500 transition-colors">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-zinc-900 rounded-3xl p-6">
              <h3 className="font-semibold text-lg mb-5">Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Status</span>
                  <span>{anime?.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Episodes</span>
                  <span>{anime?.episodes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Year</span>
                  <span>{anime?.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Type</span>
                  <span>{anime?.type}</span>
                </div>
              </div>
            </div>

            {/* Episodes List */}
            <div className="bg-zinc-900 rounded-3xl p-6">
              <h3 className="font-semibold text-lg mb-5 flex items-center gap-2">
                Episodes
              </h3>
              <div className="max-h-[420px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                <div className="flex items-center justify-between bg-zinc-950 hover:bg-zinc-800 p-4 rounded-2xl cursor-pointer transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-violet-600/20 text-violet-400 rounded-xl flex items-center justify-center text-sm font-medium group-hover:bg-violet-600 group-hover:text-white transition">
                      1
                    </div>
                    <span>Episode 1</span>
                  </div>
                  <span className="text-zinc-500 group-hover:text-white transition">▶</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}