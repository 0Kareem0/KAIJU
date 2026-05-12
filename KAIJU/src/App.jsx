import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TrendingSection from "./components/TrendingSection";
import GenresSection from "./components/GenresSection";
import Footer from "./components/Footer";

export default function App() {
  console.log("spacing");
  
  return (
    <div className="bg-zinc-950">
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <TrendingSection />
        <GenresSection />
      </main>
      <Footer />
    </div>
  );
}
