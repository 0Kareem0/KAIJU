import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrendingSection from "./components/TrendingSection";
import GenresSection from "./components/GenresSection";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Anime from "./pages/Anime";
import Manga from "./pages/Manga";
import OneAnime from "./pages/OneAnime";
import ScrollToTop from "./components/ScrollToTop";
import OneManga from "./pages/OneManga";
import { matchesSearchQuery } from "./utils/genreFilter";
import { FALLBACK_TOP_ANIME, FALLBACK_TOP_MANGA } from "./utils/fallbackData";

export default function App() {
  const [topAnime, setTopAnime] = useState(FALLBACK_TOP_ANIME);
  const [topManga, setTopManga] = useState(FALLBACK_TOP_MANGA);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (query) => {
    if (!query || !query.trim()) {
      setSearchQuery("");
      setSearchResults([]);
      return;
    }

    const trimmed = query.trim();
    setSearchQuery(trimmed);
    setIsSearching(true);

    if (window.location.pathname !== "/") {
      navigate("/");
    }

    // 1. Instantly populate with in-memory matching titles from top lists
    const existingIds = new Set();
    const combined = [];

    const localAnimeMatches = topAnime.filter((a) => matchesSearchQuery(a, trimmed));
    const localMangaMatches = topManga.filter((m) => matchesSearchQuery(m, trimmed));

    [...localAnimeMatches, ...localMangaMatches].forEach((item) => {
      if (item?.mal_id && !existingIds.has(item.mal_id)) {
        existingIds.add(item.mal_id);
        combined.push(item);
      }
    });

    // Show instant local search results immediately
    setSearchResults([...combined]);

    try {
      // 2. Fetch API Anime
      const resAnime = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(trimmed)}&limit=25`);
      if (resAnime.ok) {
        const animeData = await resAnime.json();
        (animeData.data || []).forEach((item) => {
          if (item?.mal_id && !existingIds.has(item.mal_id)) {
            existingIds.add(item.mal_id);
            combined.push(item);
          }
        });
        setSearchResults([...combined]);
      }

      // Delay to prevent Jikan 429 rate limit
      await new Promise((resolve) => setTimeout(resolve, 300));

      // 3. Fetch API Manga
      const resManga = await fetch(`https://api.jikan.moe/v4/manga?q=${encodeURIComponent(trimmed)}&limit=25`);
      if (resManga.ok) {
        const mangaData = await resManga.json();
        (mangaData.data || []).forEach((item) => {
          if (item?.mal_id && !existingIds.has(item.mal_id)) {
            existingIds.add(item.mal_id);
            combined.push(item);
          }
        });
        setSearchResults([...combined]);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
      setTimeout(() => {
        const target = document.getElementById("trending");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  };

  const handleSelectGenre = (genreTitle) => {
    setSelectedGenre(genreTitle);
    setTimeout(() => {
      const target = document.getElementById("trending");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleClearGenre = () => {
    setSelectedGenre("All");
  };

  // Fetch Live Data sequentially with rate-limit retries
  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      // 1. Fetch Top Anime
      try {
        const resAnime = await fetch(`https://api.jikan.moe/v4/top/anime`);
        if (resAnime.ok) {
          const resultAnime = await resAnime.json();
          if (isMounted && resultAnime.data?.length > 0) {
            setTopAnime(resultAnime.data);
          }
        }
      } catch (err) {
        console.error("Anime fetch error:", err);
      }

      // Delay 400ms before next fetch to avoid 429 rate limit
      await new Promise((resolve) => setTimeout(resolve, 400));

      // 2. Fetch Top Manga
      try {
        const resManga = await fetch(`https://api.jikan.moe/v4/top/manga`);
        if (resManga.ok) {
          const resultManga = await resManga.json();
          if (isMounted && resultManga.data?.length > 0) {
            setTopManga(resultManga.data);
          }
        }
      } catch (err) {
        console.error("Manga fetch error:", err);
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-zinc-950">
              <Navbar onSearch={handleSearch} />
              <main className="min-h-screen">
                <HeroSection topAnime={topAnime} topManga={topManga} />
                <TrendingSection
                  topAnime={topAnime}
                  searchResults={searchResults}
                  searchQuery={searchQuery}
                  selectedGenre={selectedGenre}
                  isSearching={isSearching}
                  onClearSearch={handleClearSearch}
                  onClearGenre={handleClearGenre}
                />
                <GenresSection selectedGenre={selectedGenre} onSelectGenre={handleSelectGenre} />
              </main>
              <Footer />
            </div>
          }
        />

        <Route path="/anime" element={<Anime />} />
        <Route path="/manga" element={<Manga topManga={topManga} />} />
        <Route
          path="/oneAnime/:id"
          element={<OneAnime topAnime={topAnime} onSearch={handleSearch} />}
        />
        <Route
          path="/oneManga/:id"
          element={<OneManga topManga={topManga} onSearch={handleSearch} />}
        />
      </Routes>
    </div>
  );
}
