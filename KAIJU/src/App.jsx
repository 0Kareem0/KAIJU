import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrendingSection from "./components/TrendingSection";
import GenresSection from "./components/GenresSection";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function App() {
    const [data, setData] = useState(null);
    // const [anime , setAnime] = useState("naruto");

  
  useEffect(()=>{                                                                                         
    const getData = async()=>{                                                                            
      try {                                                                                               
        const res = await fetch(`https://api.jikan.moe/v4/top/anime`);                             
        if (!res.ok) {                                                                                    
          throw new Error(`HTTP error! status: ${res.status}`);                                           
        }                                                                                                 
        const result = await res.json();                                                                  
        setData(result.data);                                                                             
        console.log(result);                                                                              
      } catch (error) {                                                                                   
        console.error('Failed to fetch anime data:', error);                                              
        // Optionally set an error state to show user-friendly message                                    
      }                                                                                                   
    };                                                                                                    
    getData();                                                                                            
  }, []);  

  return (
    <div className="bg-zinc-950">
      <Navbar />
      <main className="min-h-screen">
        <HeroSection data={data} />
        <TrendingSection data={data} />
        <GenresSection data={data} />
      </main>
      <Footer />
    </div>
  );
}
