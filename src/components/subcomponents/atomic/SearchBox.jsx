import '../../../css/searchBox.css';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      className='search'
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder='Search...'
      value={value}
    />
  );
};

export default SearchBox;
