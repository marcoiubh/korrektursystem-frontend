import React from 'react';

const Select = ({
  disabled,
  error,
  name,
  onChange,
  options,
  value,
}) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        {name}
      </span>
      <select
        className="form-select"
        name={name}
        onChange={onChange}
        value={value}
      >
        <option>{name}</option>
        {options.map((option) => (
          <option key={option} disabled={disabled}>
            {option}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
