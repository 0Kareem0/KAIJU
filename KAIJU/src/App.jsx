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

export default function App() {
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

    try {
      const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const result = await res.json();
        setSearchResults(result.data || []);
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

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
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
        console.error("Failed to fetch episodes data:", error);
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
                  isSearching={isSearching}
                  onClearSearch={handleClearSearch}
                />
                <GenresSection topAnime={topAnime} topManga={topManga} onSelectGenre={handleSearch} />
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


