export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/90 backdrop-blur-2xl pb-20 md:pb-8 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-500/20">
            <span className="text-white font-black text-sm">K</span>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black tracking-[0.2em] text-white">
              KAIJU
            </h2>
            <p className="text-zinc-400 text-xs mt-0.5">
              Built by Kareem • Designed for anime & manga lovers ❤️
            </p>
          </div>
        </div>

        <p className="text-zinc-500 text-xs font-medium">
          © {new Date().getFullYear()} KAIJU Platform. All rights reserved. Powered by Jikan API.
        </p>
      </div>
    </footer>
  );
}