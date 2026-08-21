import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrendingSection from "./components/TrendingSection";
import GenresSection from "./components/GenresSection";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Anime from "./pages/Anime";
import Manga from "./pages/Manga";
import OneAnime from "./pages/OneAnime";
import ScrollToTop from "./components/ScrollToTop";
import OneManga from "./pages/OneManga";

export default function App() {
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  // const [anime , setAnime] = useState("naruto");
  const [searchQuery, setSearchQuery] = useState("");
  console.log("this is the end 😓");
  

  const handleSearch = (newQuery) => {
    setSearchQuery(newQuery);
  };


  useEffect(() => {
    const getTopAnimeData = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/top/anime`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setTopAnime(result.data);
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
        setTopManga(result.data);
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
                <TrendingSection topAnime={topAnime} topManga={topManga} />
                <GenresSection topAnime={topAnime} topManga={topManga} />
              </main>
              <Footer />
            </div>
          }
        />

        <Route path="/anime" element={<Anime />} />
        <Route path="/manga" element={<Manga topManga={topManga} />} />
        <Route
          path="/oneAnime/:id"
          element={<OneAnime topAnime={topAnime} />}
        />
        <Route path="/oneManga/:id" 
        element={<OneManga topManga={topManga} />} />
      </Routes>
    </div>
  );
}
