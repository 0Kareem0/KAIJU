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

export default function App() {
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
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

      // Small delay to prevent Jikan 429 rate limit
      await new Promise((resolve) => setTimeout(resolve, 250));

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

  useEffect(() => {
    const getTopAnimeData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/top/anime`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setTopAnime(result.data || []);
      } catch (error) {
        console.error("Failed to fetch anime data:", error);
      }
    };
    getTopAnimeData();
  }, []);

  useEffect(() => {
    const getTopManga = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/top/manga`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setTopManga(result.data || []);
      } catch (error) {
        console.error("Failed to fetch manga data:", error);
      }
    };
    getTopManga();
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
