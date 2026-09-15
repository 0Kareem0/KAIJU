import GenreButton from "./GenreButton";
import { useState, useEffect } from "react";

export default function GenresSection({ onSelectGenre }) {
  const [showButton, setShowButton] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
    { title: "All", icon: "✨" },
    { title: "Action", icon: "⚔️" },
    { title: "Fantasy", icon: "🔮" },
    { title: "Drama", icon: "🎭" },
    { title: "Comedy", icon: "😂" },
    { title: "Romance", icon: "💖" },
    { title: "Sci-Fi", icon: "🚀" },
    { title: "Shonen", icon: "🔥" },
    { title: "Mystery", icon: "🔍" },
    { title: "Slice of Life", icon: "🍃" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGenreClick = (genreTitle) => {
    setSelectedGenre(genreTitle);
    if (onSelectGenre) {
      onSelectGenre(genreTitle);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section id="genres" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 scroll-mt-20">
      <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-2xl shadow-purple-950/20 relative overflow-hidden">
        {/* Subtle Background Accent Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col gap-6 relative z-10">
          <div>
            <span className="px-3.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs rounded-full font-bold uppercase tracking-wider">
              🏷️ Categories
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              Browse By Genre
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
              Select a story category below to filter titles instantly.
            </p>
          </div>

          {/* Swipeable Horizontal Genre Pills */}
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-2 px-2 scroll-smooth">
            {genres.map((genre) => (
              <GenreButton
                key={genre.title}
                title={genre.title}
                icon={genre.icon}
                active={selectedGenre === genre.title}
                onClick={() => handleGenreClick(genre.title)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Arrow Button */}
      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className={`fixed bottom-16 sm:bottom-8 right-4 sm:right-8 z-40 w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-purple-500/40 backdrop-blur-md border border-white/20 transition-all duration-300 active:scale-90 hover:scale-110 ${
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <span className="text-xl sm:text-2xl font-black">↑</span>
      </button>
    </section>
  );
}