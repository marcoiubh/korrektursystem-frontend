import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        {name}
      </span>
      {/* <label htmlFor={name}>{name}</label> */}
      <input
        {...rest}
        placeholder={`type a ${name}`}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
