import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrendingSection from "./components/TrendingSection";
import GenresSection from "./components/GenresSection";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function App() {
  const [topAnime, setTopAnime] = useState([])
  const [newEpisodes, setNewEpisodes] = useState([])
    // const [anime , setAnime] = useState("naruto");
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (newQuery) => {
      setSearchQuery(newQuery)
    }
  
  useEffect(()=>{                                                                                         
    const getTopAnimeData = async()=>{                                                                            
      try {                                                                                               
        const res = await fetch(`https://api.jikan.moe/v4/top/anime`);                             
        if (!res.ok) {                                                                                    
          throw new Error(`HTTP error! status: ${res.status}`);                                           
        }                                                                                                 
        const result = await res.json();                                                                  
        setTopAnime(result.data);                                                                               
      } catch (error) {                                                                                   
        console.error('Failed to fetch anime data:', error);                                              
      }                                                                                                   
    };                                                                                                    
    getTopAnimeData();                                                                                            
  }, []);  


  useEffect(() => {
     const getNewEpisodes = async() => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/characters/1/full`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const result = await res.json();
        setNewEpisodes(result.data);
        console.log(result);
        
      } catch (error) {
        console.error('Failed to fetch episodes data:', error);
      }
     }
     getNewEpisodes();
  }, []);

  return (
    <div className="bg-zinc-950">
      <Navbar onSearch={handleSearch} />
      <main className="min-h-screen">
        <HeroSection topAnime={topAnime} newEpisodes={newEpisodes}   />
        <TrendingSection topAnime={topAnime} newEpisodes={newEpisodes} />
        <GenresSection topAnime={topAnime} newEpisodes={newEpisodes} />
      </main>
      <Footer />
    </div>
  );
}
