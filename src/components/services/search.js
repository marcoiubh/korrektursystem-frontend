export function search(items, searchQuery) {
  // TODO: pass config file keys
  return items.filter((m) => {
    return (
      m.date.startsWith(searchQuery) ||
      m.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.priority.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}
