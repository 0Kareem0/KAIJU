import GenreButton from "./GenreButton";
import { useState, useEffect } from "react";

export default function GenresSection() {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section id="genres" className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28 scroll-mt-20">
      <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-zinc-900/60 p-5 sm:p-8 md:p-10 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-col gap-6">
          <div>
            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs rounded-full font-medium">
              🏷️ Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
              Browse By Genre
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1 max-w-xl">
              Filter anime and manga titles by your favorite story categories.
            </p>
          </div>

          {/* Swipeable Horizontal Genre Pills on Mobile */}
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-2 px-2 scroll-smooth">
            {genres.map((genre) => (
              <GenreButton
                key={genre.title}
                title={genre.title}
                icon={genre.icon}
                active={selectedGenre === genre.title}
                onClick={() => setSelectedGenre(genre.title)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top Arrow Button */}
      <button
        aria-label="Scroll to top"
        onClick={scrollToTop}
        className={`fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-40 w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center shadow-lg shadow-purple-500/30 backdrop-blur-md border border-white/20 transition-all duration-300 active:scale-95 ${
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <span className="text-lg sm:text-xl font-bold">↑</span>
      </button>
    </section>
  );
}