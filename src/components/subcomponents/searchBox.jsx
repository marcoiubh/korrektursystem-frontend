import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      className="form-control my-3"
      name="query"
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search..."
      type="text"
      value={value}
    />
  );
};

export default SearchBox;
