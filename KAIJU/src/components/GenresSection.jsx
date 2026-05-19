import GenreButton from "./GenreButton";
import { useState, useEffect } from "react";

export default function GenresSection() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className="max-w-7xl mx-auto px-6 pb-24">
      <div className="rounded-[2rem] border border-white/10 bg-zinc-900/60 p-8 md:p-12 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white">Browse By Genre</h2>
            <p className="text-zinc-400 mt-2 max-w-xl">
              Genre buttons structure.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <GenreButton title="Action" />
            <GenreButton title="Fantasy" />
            <GenreButton title="Drama" />
            <GenreButton title="Comedy" />
          </div>
        </div>
      </div>
          <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/30 transition-all duration-300 ${
        showButton
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
    </button>      
    </section>
  );
}