import { useState, useEffect } from "react";

export default function Navbar({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setInputValue("");
    }
  };

  // Close mobile menu automatically on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-[0.3em] text-purple-400">
            KAIJU
          </h1>

          <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.25em] mt-1">
            Anime Platform
          </p>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
          <a
            href="#"
            className="hover:text-purple-400 transition-colors relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
          </a>

          <a
            href="#"
            className="hover:text-purple-400 transition-colors relative group"
          >
            Trending
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
          </a>

          <a
            href="/manga"
            className="hover:text-purple-400 transition-colors relative group"
          >
            Manga
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
          </a>

          <a
            href="#"
            className="hover:text-purple-400 transition-colors relative group"
          >
            Genres
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
          </a>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4 flex-1 md:flex-none justify-end">
          <form
            className="flex gap-2 w-full sm:w-auto max-w-xs sm:max-w-none"
            onSubmit={onSubmit}
          >
            <input
              className="px-3 sm:px-4 py-2 rounded-full bg-zinc-800 text-white text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Search..."
            />

            <button
              className="hidden sm:block px-3 sm:px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 transition-all font-medium shadow-lg shadow-purple-500/30 transform hover:scale-105 text-sm"
              type="submit"
            >
              Search
            </button>
          </form>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-center gap-1">
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>

              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>

              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-6 gap-4 text-sm text-zinc-300">
          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-purple-400 transition-colors py-2 border-b border-white/5"
          >
            Home
          </a>

          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-purple-400 transition-colors py-2 border-b border-white/5"
          >
            Trending
          </a>

          <a
            href="#manga"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-purple-400 transition-colors py-2 border-b border-white/5"
          >
            Manga
          </a>

          <a
            href="#"
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-purple-400 transition-colors py-2 border-b border-white/5"
          >
            Genres
          </a>
        </nav>
      </div>
    </header>
  );
}
