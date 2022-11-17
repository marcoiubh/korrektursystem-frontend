import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        {name}
      </span>
      <input
        {...rest}
        className="form-control"
        id={name}
        name={name}
        placeholder={`type a ${name}`}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
