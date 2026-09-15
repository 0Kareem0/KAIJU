import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimeCard from "../components/AnimeCard";

export default function Manga({ topManga = [] }) {
  const mangaList = Array.isArray(topManga) ? topManga : [];
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleMangaSearch = async (query) => {
    if (!query.trim()) {
      setSearchQuery("");
      setSearchResults([]);
      return;
    }

    const trimmed = query.trim();
    setSearchQuery(trimmed);
    setIsSearching(true);

    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const result = await res.json();
        setSearchResults(result.data || []);
      }
    } catch (error) {
          console.error("Manga search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const isSearchActive = Boolean(searchQuery.trim());
  const displayedManga = isSearchActive ? searchResults : mangaList;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col overflow-x-hidden">
      {/* UNIFIED NAV */}
      <Navbar onSearch={handleMangaSearch} />

      {/* HERO SECTION */}
      <section className="relative px-4 sm:px-6 md:px-12 pt-8 sm:pt-14 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block uppercase tracking-[0.25em] text-purple-400 text-xs font-bold px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3.5 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            📖 Manga Universe
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
            Trending Manga Series
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Explore epic stories, legendary artwork, and top-rated chapter releases from around the globe.
          </p>
        </div>
      </section>

      {/* MANGA GRID */}
      <section className="px-4 sm:px-6 md:px-12 pb-24 flex-1 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 gap-4 border-b border-white/10 pb-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white flex items-center gap-2">
            <span>{isSearchActive ? "🔍" : "🔥"}</span>
            {isSearchActive ? `Results for "${searchQuery}"` : "Top Ranked Manga"}
          </h2>

          {isSearchActive && (
            <button
              onClick={handleClearSearch}
              className="px-4 py-2.5 rounded-2xl bg-zinc-900 border border-white/15 hover:border-purple-500/40 text-xs font-bold text-zinc-300 hover:text-white transition-all active:scale-95 flex items-center gap-2 shadow-md"
            >
              <span>✖ Clear Search</span>
            </button>
          )}
        </div>

        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>
            <p className="text-zinc-300 font-medium text-sm">Searching manga for "{searchQuery}"...</p>
          </div>
        ) : displayedManga.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-6">
            {displayedManga.map((manga) => (
              <AnimeCard key={manga.mal_id} item={manga} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6 text-zinc-400 text-sm bg-zinc-900/50 rounded-3xl border border-white/10 backdrop-blur-xl">
            <p className="text-lg font-bold text-white mb-1">No manga found matching "{searchQuery}"</p>
            <p className="text-xs text-zinc-500">Try searching for another manga title or keyword.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}