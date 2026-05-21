import { useState, useEffect } from "react";

export default function HeroSection({ topAnime = [] }) {
  const safeTopAnime = Array.isArray(topAnime) ? topAnime : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const names = [
    "⚔️Jujutsu Kaisen",
    "🏴‍☠️One Piece",
    "🔥Chainsaw Man",
    "🧝Frieren",
    "👁️Oshi no Ko",
    "⚡Solo Leveling",
    "🩸Bleach TYBW",
    "🛡️Attack on Titan",
    "🌊Demon Slayer",
    "🃏Re:ZERO",
    "🎩Witch Hat Atelier",
    "☄️Dandadan",
    "👹Dorohedoro",
    "🌀Naruto",
    "🧪Dr. Stone",
  ];

  const images = safeTopAnime
    .slice(0, 6)
    .map(
      (anime) =>
        anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url,
    )
    .filter(Boolean);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const currentAnime = safeTopAnime[currentIndex] || {};

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-28 grid lg:grid-cols-2 gap-8 sm:gap-14 items-center overflow-hidden">
      {/* Left Side */}
      <div className="space-y-6 sm:space-y-8 z-10">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-xs sm:text-sm mb-4 sm:mb-6 backdrop-blur-sm animate-pulse">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></span>
          🔥 Trending Anime Platform
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight bg-linear-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          Discover The World Of
          <span className="block text-purple-400">Anime</span>
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
          Build your anime platform with your own API and dynamic content.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
          <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-linear-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold transition-all transform hover:scale-105 text-sm sm:text-base">
            Explore Now
          </button>
          <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-2xl border border-white/20 hover:border-purple-500/40 text-white hover:bg-purple-500/10 font-semibold transition-all transform hover:scale-105 text-sm sm:text-base">
            Watch Trailer
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - Improved */}
      <div className="relative group h-[400px] sm:h-[480px] md:h-[520px] lg:h-[640px] flex items-center hover:scale-105 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/10 to-transparent rounded-[3rem] blur-3xl group-hover:blur-[5rem] z-0" />

        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/30 bg-zinc-950">
          {images.length > 0 ? (
            images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Featured"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              />
            ))
          ) : (
            <img
              src="/placeholder.jpg"
              className="w-full h-full object-cover"
              alt="Placeholder"
            />
          )}

          {/* === STRONGER OVERLAY === */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent z-10" />

          {/* Extra dark bar at bottom for text safety */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />

          {/* Text Content */}
          {images.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-20">
              <div className="inline-block px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 bg-purple-600 text-white text-xs sm:text-sm font-bold rounded-full mb-2 sm:mb-4">
                TRENDING
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight drop-shadow-2xl">
                {currentAnime.title}
              </h3>

              {currentAnime.synopsis && (
                <p className="text-zinc-300 mt-2 sm:mt-3 line-clamp-2 sm:line-clamp-3 text-xs sm:text-sm md:text-[15px] leading-relaxed hidden sm:block">
                  {currentAnime.synopsis.slice(0, 180)}...
                </p>
              )}
            </div>
          )}

          {/* Progress Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 flex gap-1.5 sm:gap-2 z-30">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-purple-400 scale-125"
                      : "bg-white/50 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <section className=" mt-12 sm:mt-16 px-4 sm:px-6 py-3 sm:py-4 mx-auto relative overflow-hidden border-t border-white/10">
        <div className="flex whitespace-nowrap animate-marquee gap-4 sm:gap-8">
          {[...names, ...names].map((name, index) => (
            <span key={index} className="text-gray-400 text-xs sm:text-sm tracking-wide">
              {name}
            </span>
          ))}
        </div>
      </section>
    </section>
  );
}
