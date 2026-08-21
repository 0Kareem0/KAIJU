import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ onSearch }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const location = useLocation();

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (onSearch) onSearch(inputValue.trim());
      setIsMenuOpen(false);
    }
  };

  const handleClearInput = () => {
    setInputValue("");
    if (onSearch) onSearch("");
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
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-2xl bg-zinc-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-lg">K</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-[0.25em] text-white flex items-center gap-1">
                KAIJU
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              </h1>
              <p className="text-[9px] sm:text-[10px] text-purple-400/80 uppercase tracking-[0.2em] font-semibold">
                Anime Platform
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-300 font-medium">
            <Link
              to="/"
              className={`hover:text-purple-400 transition-colors relative py-1 ${
                location.pathname === "/" ? "text-purple-400 font-semibold" : ""
              }`}
            >
              Home
              {location.pathname === "/" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
              )}
            </Link>

            <a
              href="#trending"
              className="hover:text-purple-400 transition-colors relative py-1"
            >
              Trending
            </a>

            <Link
              to="/manga"
              className={`hover:text-purple-400 transition-colors relative py-1 ${
                location.pathname === "/manga" ? "text-purple-400 font-semibold" : ""
              }`}
            >
              Manga
              {location.pathname === "/manga" && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></span>
              )}
            </Link>

            <a
              href="#genres"
              className="hover:text-purple-400 transition-colors relative py-1"
            >
              Genres
            </a>
          </nav>

          {/* SEARCH & MENU TOGGLE */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 md:flex-none justify-end">
            <form
              className="flex gap-2 w-full sm:w-auto max-w-[220px] sm:max-w-none"
              onSubmit={onSubmit}
            >
              <div className="relative w-full sm:w-64">
                <input
                  className="w-full px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-zinc-900/90 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all pr-14"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  type="text"
                  placeholder="Search anime, manga..."
                />
                
                {inputValue ? (
                  <button
                    type="button"
                    onClick={handleClearInput}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors text-xs p-1"
                  >
                    ✖
                  </button>
                ) : null}

                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                >
                  🔍
                </button>
              </div>

              <button
                className="hidden sm:block px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium shadow-md shadow-purple-500/20 transform hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm shrink-0"
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Mobile Hamburger Toggle */}
            <button
              aria-label="Toggle Navigation Menu"
              className="md:hidden p-2.5 rounded-xl bg-zinc-900 border border-white/10 hover:bg-zinc-800 active:scale-95 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5 bg-purple-400" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2 bg-purple-400" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE TOP DRAWER MENU */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-white/10 ${
            isMenuOpen ? "max-h-80 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          } bg-zinc-950/95 backdrop-blur-2xl`}
        >
          <nav className="flex flex-col px-6 gap-2 text-sm text-zinc-300">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${
                location.pathname === "/"
                  ? "bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30"
                  : "hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <span className="text-base">🏠</span> Home
            </Link>

            <a
              href="#trending"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-zinc-900 hover:text-white transition-all"
            >
              <span className="text-base">🔥</span> Trending
            </a>

            <Link
              to="/manga"
              onClick={() => setIsMenuOpen(false)}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl transition-all ${
                location.pathname === "/manga"
                  ? "bg-purple-600/20 text-purple-300 font-semibold border border-purple-500/30"
                  : "hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <span className="text-base">📖</span> Manga Section
            </Link>

            <a
              href="#genres"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-zinc-900 hover:text-white transition-all"
            >
              <span className="text-base">🏷️</span> Genres
            </a>
          </nav>
        </div>
      </header>

      {/* FIXED MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-2xl border-t border-white/10 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link
            to="/"
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
              location.pathname === "/" ? "text-purple-400 font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="text-lg">🏠</span>
            <span className="text-[10px] mt-0.5">Home</span>
          </Link>

          <a
            href="#trending"
            className="flex flex-col items-center py-1 px-3 rounded-xl text-zinc-400 hover:text-white transition-all"
          >
            <span className="text-lg">🔥</span>
            <span className="text-[10px] mt-0.5">Trending</span>
          </a>

          <Link
            to="/manga"
            className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
              location.pathname === "/manga" ? "text-purple-400 font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="text-lg">📖</span>
            <span className="text-[10px] mt-0.5">Manga</span>
          </Link>

          <a
            href="#genres"
            className="flex flex-col items-center py-1 px-3 rounded-xl text-zinc-400 hover:text-white transition-all"
          >
            <span className="text-lg">🏷️</span>
            <span className="text-[10px] mt-0.5">Genres</span>
          </a>
        </div>
      </div>
    </>
  );
}

