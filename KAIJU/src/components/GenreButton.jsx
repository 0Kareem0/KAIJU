export default function GenreButton({ title }) {
  return (
    <button className="px-6 py-3 rounded-2xl bg-black/40 border border-white/10 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all">
      {title}
    </button>
  );
}