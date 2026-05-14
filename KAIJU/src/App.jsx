import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrendingSection from "./components/TrendingSection";
import GenresSection from "./components/GenresSection";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function App() {
    const [data, setData] = useState(null);
    const [anime , setAnime] = useState("naruto");

  
useEffect(()=>{
  const getData = async()=>{
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${anime}`);
    const result = await res.json();
    setData(result.data);
    console.log(result);
    
  };
  getData();
}, [anime]);

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
