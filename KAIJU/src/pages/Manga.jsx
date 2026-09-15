import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AnimeCard from "../components/AnimeCard";
import GenresSection from "../components/GenresSection";
import { matchesGenreFilter, matchesSearchQuery } from "../utils/genreFilter";

export default function Manga({ topManga = [] }) {
  const [mangaData, setMangaData] = useState(topManga || []);
  const [loading, setLoading] = useState(topManga?.length === 0);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isSearching, setIsSearching] = useState(false);

  // Sync or fetch top manga if props empty
  useEffect(() => {
    let isMounted = true;

    if (topManga && topManga.length > 0) {
      setMangaData(topManga);
      setLoading(false);
      return;
    }

    const fetchTopManga = async () => {
      setLoading(true);
      let retries = 3;
      let delay = 1000;

      while (retries > 0) {
        try {
          const res = await fetch(`https://api.jikan.moe/v4/top/manga`);
          if (res.status === 429) {
            await new Promise((r) => setTimeout(r, delay));
            delay *= 1.5;
            retries--;
            continue;
          }
          if (!res.ok) throw new Error(`HTTP status ${res.status}`);
          const result = await res.json();
          if (isMounted) {
            setMangaData(result.data || []);
            setLoading(false);
          }
          return;
        } catch (err) {
          retries--;
          if (retries === 0 && isMounted) {
            setLoading(false);
          } else {
            await new Promise((r) => setTimeout(r, delay));
          }
        }
      }
    };

    fetchTopManga();

    return () => {
      isMounted = false;
    };
  }, [topManga]);

  const handleMangaSearch = async (query) => {
    if (!query || !query.trim()) {
      setSearchQuery("");
      setSearchResults([]);
      return;
    }

    const trimmed = query.trim();
    setSearchQuery(trimmed);
    setIsSearching(true);

    // 1. Instant local title match
    const existingIds = new Set();
    const combined = [];
    const localMatches = (mangaData || []).filter((m) => matchesSearchQuery(m, trimmed));
    localMatches.forEach((item) => {
      if (item?.mal_id && !existingIds.has(item.mal_id)) {
        existingIds.add(item.mal_id);
        combined.push(item);
      }
    });

    setSearchResults([...combined]);

    try {
      const res = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(trimmed)}&limit=25`);
      if (res.ok) {
        const result = await res.json();
        (result.data || []).forEach((item) => {
          if (item?.mal_id && !existingIds.has(item.mal_id)) {
            existingIds.add(item.mal_id);
            combined.push(item);
          }
        });
        setSearchResults([...combined]);
      }
    } catch (error) {
      console.error("Manga search failed:", error);
    } finally {
      setIsSearching(false);
      setTimeout(() => {
        const target = document.getElementById("trending");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  const handleSelectGenre = (genreTitle) => {
    setSelectedGenre(genreTitle);
    setTimeout(() => {
      const target = document.getElementById("trending");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleClearGenre = () => {
    setSelectedGenre("All");
  };

  const handleResetFilters = () => {
    handleClearSearch();
    handleClearGenre();
  };

  const isSearchActive = Boolean(searchQuery.trim());
  const isGenreActive = selectedGenre && selectedGenre !== "All";

  const rawList = isSearchActive ? searchResults : mangaData;
  const displayedManga = rawList.filter((item) => matchesGenreFilter(item, selectedGenre));

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

      {/* GENRES SECTION FOR MANGA */}
      <GenresSection selectedGenre={selectedGenre} onSelectGenre={handleSelectGenre} />

      {/* MANGA GRID */}
      <section id="trending" className="px-4 sm:px-6 md:px-12 pb-24 flex-1 max-w-7xl mx-auto w-full scroll-mt-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-10 gap-4 border-b border-white/10 pb-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white flex items-center gap-2">
            <span>{isSearchActive ? "🔍" : isGenreActive ? "🏷️" : "🔥"}</span>
            {isSearchActive
              ? isGenreActive
                ? `"${searchQuery}" in ${selectedGenre}`
                : `Results for "${searchQuery}"`
              : isGenreActive
              ? `${selectedGenre} Manga`
              : "Top Ranked Manga"}
          </h2>

          {(isSearchActive || isGenreActive) && (
            <button
              onClick={handleResetFilters}
              className="px-4 py-2.5 rounded-2xl bg-zinc-900 border border-white/15 hover:border-purple-500/40 text-xs font-bold text-zinc-300 hover:text-white transition-all active:scale-95 flex items-center gap-2 shadow-md"
            >
              <span>✖ Clear Filter</span>
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(168,85,247,0.4)]"></div>
            <p className="text-zinc-300 font-medium text-sm">Loading Manga titles...</p>
          </div>
        ) : isSearching && displayedManga.length === 0 ? (
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
            <p className="text-lg font-bold text-white mb-1">
              {isSearchActive && isGenreActive
                ? `No ${selectedGenre} manga found matching "${searchQuery}"`
                : isSearchActive
                ? `No manga found matching "${searchQuery}"`
                : `No manga found in category "${selectedGenre}"`}
            </p>
            <p className="text-xs text-zinc-500 mt-1">Try selecting another genre category or keyword.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}