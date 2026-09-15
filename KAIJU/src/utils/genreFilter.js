export const matchesGenreFilter = (item, genre) => {
  if (!genre || genre === "All") return true;
  if (!item) return false;

  const target = genre.toLowerCase().replace(/[^a-z0-9]/g, "");

  const allTags = [
    ...(item.genres || []),
    ...(item.demographics || []),
    ...(item.themes || []),
    ...(item.explicit_genres || [])
  ];

  return allTags.some((t) => {
    if (!t || !t.name) return false;
    const tagName = t.name.toLowerCase().replace(/[^a-z0-9]/g, "");
    return tagName.includes(target) || target.includes(tagName);
  });
};
