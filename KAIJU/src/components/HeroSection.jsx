import { useState, useEffect } from 'react';

export default function HeroSection({ topAnime = [] }) {
  
  // Make sure it's always an array
  const safeTopAnime = Array.isArray(topAnime) ? topAnime : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Build images array from topAnime only
  const images = safeTopAnime
    .slice(0, 6) // Take first 6 anime
    .map((anime) => 
      anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url
    )
    .filter(Boolean); // Remove any invalid image URLs

  // Auto slide every 2.8 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [images.length]);

  // Current anime being shown
  const currentAnime = safeTopAnime[currentIndex] || {};

  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-28 grid lg:grid-cols-2 gap-14 items-center overflow-hidden">
      
      {/* Left Side - Text Content */}
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm mb-6 backdrop-blur-sm animate-pulse">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></span>
          🔥 Trending Anime Platform
        </div>

        <h2 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          Discover The World Of
          <span className="block text-purple-400 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">Anime</span>
        </h2>

        <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-xl">
          Build your anime platform with your own API and dynamic content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30">
            Explore Now
          </button>
          <button className="px-8 py-4 rounded-2xl border border-white/20 hover:border-purple-500/40 text-white hover:bg-purple-500/10 font-semibold transition-all transform hover:scale-105">
            Watch Trailer
          </button>
        </div>
      </div>

      {/* Right Side - Image Slider */}
      <div className="relative group h-[520px] lg:h-[580px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-transparent rounded-[3rem] blur-3xl group-hover:blur-[4rem] transition-all duration-700" />

        <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/20 bg-zinc-950">
          
          {/* Images */}
          {images.length > 0 ? (
            images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Featured Anime"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                  index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
              />
            ))
          ) : (
            <img 
              src="/egypt.jpeg" 
              className="w-full h-full object-cover" 
              alt="Placeholder" 
            />
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-20" />

          {/* Title Overlay */}
          {images.length > 0 && (
            <div className="absolute bottom-8 left-8 right-8 z-30 text-white">
              <div className="inline-block px-3 py-1 bg-purple-600/90 text-xs font-medium rounded-full mb-3">
                TRENDING
              </div>
              <h3 className="text-2xl md:text-3xl font-bold drop-shadow-lg line-clamp-2">
                {currentAnime.title || "Featured Anime"}
              </h3>
            </div>
          )}

          {/* Progress Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-8 right-8 flex gap-2 z-30">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex ? 'bg-purple-400 w-8' : 'bg-white/40 w-2.5 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Scanline effect */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,#ffffff08_0px,#ffffff08_2px,transparent_2px,transparent_4px)] pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
}