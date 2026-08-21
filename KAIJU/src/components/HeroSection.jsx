import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection({ topAnime = [] }) {
  const safeTopAnime = Array.isArray(topAnime) ? topAnime : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const names = [
    "⚔️ Jujutsu Kaisen",
    "🏴‍☠️ One Piece",
    "🔥 Chainsaw Man",
    "🧝 Frieren",
    "👁️ Oshi no Ko",
    "⚡ Solo Leveling",
    "🩸 Bleach TYBW",
    "🛡️ Attack on Titan",
    "🌊 Demon Slayer",
    "🃏 Re:ZERO",
    "🎩 Witch Hat Atelier",
    "☄️ Dandadan",
    "👹 Dorohedoro",
    "🌀 Naruto",
    "🧪 Dr. Stone",
  ];

  const images = safeTopAnime
    .slice(0, 6)
    .map(
      (anime) =>
        anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url
    )
    .filter(Boolean);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const currentAnime = safeTopAnime[currentIndex] || {};

  const handleHeroClick = () => {
    if (currentAnime.mal_id) {
      navigate(`/oneAnime/${currentAnime.mal_id}`);
    }
  };

  return (
    <div className="relative overflow-hidden pt-4 sm:pt-8 pb-8 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Left Side Info */}
        <div className="space-y-4 sm:space-y-6 z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs sm:text-sm backdrop-blur-md">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></span>
            <span className="font-medium">🔥 Premier Anime & Manga Stream</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight bg-gradient-to-r from-white via-purple-100 to-purple-400 bg-clip-text text-transparent">
            Discover The World Of
            <span className="block text-purple-400 font-extrabold mt-1">
              Epic Anime
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Explore thousands of top-rated anime series, trending manga releases, and detailed episode guides.
          </p>

          <div className="flex flex-row gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
            <a
              href="#trending"
              className="flex-1 sm:flex-none text-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold transition-all shadow-lg shadow-purple-500/25 active:scale-95 text-xs sm:text-base"
            >
              Explore Now
            </a>
            <a
              href="#genres"
              className="flex-1 sm:flex-none text-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-white/15 hover:border-purple-500/40 text-white hover:bg-purple-500/10 font-bold transition-all active:scale-95 text-xs sm:text-base"
            >
              Browse Genres
            </a>
          </div>
        </div>

        {/* Right Side Carousel */}
        <div
          onClick={handleHeroClick}
          className="relative group h-[340px] sm:h-[420px] md:h-[480px] lg:h-[540px] flex items-center cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-pink-500/10 rounded-[2.5rem] blur-3xl group-hover:blur-[4rem] transition-all duration-500 z-0" />

          <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-purple-500/20 bg-zinc-950">
            {images.length > 0 ? (
              images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={safeTopAnime[index]?.title || "Featured"}
                  className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-1000 ${
                    index === currentIndex
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                />
              ))
            ) : (
              <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-500 text-sm">
                Loading Featured Anime...
              </div>
            )}

            {/* Subtle Gradient Overlay at bottom only so top 60% of image is 100% visible */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent z-10 pointer-events-none" />

            {/* Featured Info Overlay (Compact) */}
            {images.length > 0 && currentAnime.title && (
              <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-5 md:p-6 z-20">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                  <span className="px-2.5 py-0.5 bg-purple-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-md shadow-md">
                    TRENDING #{currentIndex + 1}
                  </span>
                  {currentAnime.score && (
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 text-yellow-400 text-[10px] sm:text-xs font-bold rounded-md">
                      ⭐ {currentAnime.score}
                    </span>
                  )}
                </div>

                <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white leading-tight drop-shadow-md line-clamp-1 sm:line-clamp-2">
                  {currentAnime.title}
                </h3>
              </div>
            )}

            {/* Carousel Indicators */}
            {images.length > 1 && (
              <div className="absolute top-3.5 right-3.5 flex gap-1.5 z-30 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-5 bg-purple-400"
                        : "w-1.5 bg-white/40 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full-width Marquee Ticker */}
      <div className="mt-8 sm:mt-12 py-3 border-y border-white/10 bg-zinc-950/60 backdrop-blur-md relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
        
        <div className="flex whitespace-nowrap animate-marquee gap-6 sm:gap-10 items-center">
          {[...names, ...names].map((name, index) => (
            <span
              key={index}
              className="text-zinc-400 hover:text-purple-300 transition-colors text-xs sm:text-sm font-medium tracking-wide flex items-center gap-2 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


