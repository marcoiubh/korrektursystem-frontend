export function search(items, searchQuery) {
  return items.filter((m) => {
    return (
      (m.status &&
        m.status.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (m.priority &&
        m.priority
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      m.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
}
