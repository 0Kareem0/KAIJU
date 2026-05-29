import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Manga() {
  const [mangaList, setMangaList] = useState([]);

  useEffect(() => {
    setMangaList([
      {
        id: 1,
        title: "Berserk",
        image: "https://picsum.photos/500/700?random=1",
        genre: "Dark Fantasy",
      },
      {
        id: 2,
        title: "Chainsaw Man",
        image: "https://picsum.photos/500/700?random=2",
        genre: "Action",
      },
      {
        id: 3,
        title: "Blue Lock",
        image: "https://picsum.photos/500/700?random=3",
        genre: "Sports",
      },
      {
        id: 4,
        title: "Tokyo Ghoul",
        image: "https://picsum.photos/500/700?random=4",
        genre: "Horror",
      },
      {
        id: 5,
        title: "Monster",
        image: "https://picsum.photos/500/700?random=5",
        genre: "Psychological",
      },
      {
        id: 6,
        title: "Vagabond",
        image: "https://picsum.photos/500/700?random=6",
        genre: "Samurai",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          
          {/* LOGO */}
          <h1 className="text-3xl font-black tracking-wide">
            <span className="text-purple-500">K</span>AIJU
          </h1>

          {/* LINKS */}
          <div className="flex items-center gap-6 text-sm md:text-base">
            <Link
              to="/"
              className="hover:text-purple-400 transition"
            >
              Home
            </Link>

            <button className="hover:text-purple-400 transition">
              Trending
            </button>

            <button className="hover:text-purple-400 transition">
              Genres
            </button>

            <button className="hover:text-purple-400 transition">
              Top Rated
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative px-6 md:px-12 py-20 overflow-hidden">
        
        {/* GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-700/20 blur-[120px] rounded-full" />

        <div className="relative z-10 max-w-5xl">
          <p className="uppercase tracking-[6px] text-purple-400 text-sm mb-6">
            Manga Collection
          </p>

          <h1 className="text-6xl md:text-8xl font-black leading-none">
            Explore
            <br />
            Amazing Manga
          </h1>

          <p className="text-zinc-400 text-lg mt-8 max-w-2xl leading-relaxed">
            Discover trending manga, legendary stories,
            dark fantasy worlds and unforgettable characters.
          </p>

          {/* SEARCH */}
          <div className="mt-10 flex items-center bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden max-w-xl">
            <input
              type="text"
              placeholder="Search manga..."
              className="w-full bg-transparent px-6 py-4 outline-none placeholder:text-zinc-500"
            />

            <button className="bg-purple-600 hover:bg-purple-700 transition px-8 py-4 font-semibold">
              Search
            </button>
          </div>
        </div>
      </section>

     {/* MANGA SECTION */}
<section className="px-6 md:px-12 pb-24">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-3xl md:text-4xl font-black">
      Trending Manga
    </h2>

    <button className="text-purple-400 hover:text-purple-300 transition text-sm">
      View All →
    </button>
  </div>

  {/* SMALLER CARDS */}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
    {mangaList.map((item) => (
      <div
        key={item.id}
        className="group rounded-3xl overflow-hidden bg-zinc-900/70 border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-2 flex flex-col"
      >
        
        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* SCORE */}
          <div className="absolute bottom-3 left-3 z-20 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1">
            <span className="text-yellow-400 text-sm">⭐</span>

            <span className="text-xs font-semibold">
              9.2
            </span>
          </div>

          {/* GENRE */}
          <div className="absolute top-3 right-3 z-20 bg-purple-600/90 px-2.5 py-1 rounded-full text-[10px] font-semibold">
            {item.genre}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-3 flex flex-col flex-1">
          
          {/* TITLE */}
          <h3 className="text-sm md:text-base font-bold text-white line-clamp-2 group-hover:text-purple-300 transition">
            {item.title}
          </h3>

          {/* STATUS */}
          <div className="flex items-center justify-between mt-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>

              <span className="text-green-400">
                Publishing
              </span>
            </div>

            <span className="text-zinc-500">
              170 Ch.
            </span>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 transition py-2 rounded-2xl text-sm font-semibold">
              Read
            </button>

            <button className="w-10 rounded-2xl border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 transition">
              +
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
    </div>
  );
}