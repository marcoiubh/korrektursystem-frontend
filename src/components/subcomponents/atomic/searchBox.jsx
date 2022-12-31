import '../../../css/searchBox.css';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      className="search"
      name="query"
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search..."
      type="text"
      value={value}
    />
  );
};

export default SearchBox;
