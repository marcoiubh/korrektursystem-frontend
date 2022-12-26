import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      className="form-control"
      name="query"
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search..."
      type="text"
      value={value}
    />
  );
};

export default SearchBox;
