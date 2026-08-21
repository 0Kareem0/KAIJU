export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/80 backdrop-blur-xl pb-20 md:pb-8 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-[0.25em] text-purple-400">
            KAIJU
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Built by Kareem • Designed for anime & manga lovers ❤️
          </p>
        </div>

        <p className="text-zinc-500 text-xs">
          © {new Date().getFullYear()} KAIJU Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}