export default function GenreButton({ title, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`group relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border transition-all duration-300 transform active:scale-95 flex items-center gap-2 shrink-0 ${
        active
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-lg shadow-purple-500/30 scale-105"
          : "bg-zinc-900/90 border-white/10 text-zinc-300 hover:border-purple-500/40 hover:text-white hover:bg-zinc-800"
      }`}
    >
      {icon && <span className="text-base sm:text-lg">{icon}</span>}
      <span className="font-semibold text-xs sm:text-sm whitespace-nowrap">
        {title}
      </span>
    </button>
  );
}