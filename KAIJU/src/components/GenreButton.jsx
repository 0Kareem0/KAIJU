export default function GenreButton({ title }) {
  return (
    <button className="group relative px-6 py-3 rounded-2xl bg-black/40 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:via-purple-500/5 group-hover:to-purple-500/0 transition-all duration-300"></div>
      <span className="relative z-10 font-medium text-white group-hover:text-purple-300 transition-colors duration-300">
        {title}
      </span>
      <div className="absolute top-0 left-0 w-full h-full rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </button>
  );
}