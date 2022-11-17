import React from 'react';

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        {name}
      </span>
      <textarea
        {...rest}
        placeholder={`type a ${name}`}
        name={name}
        id={name}
        className="form-control"
        rows="4"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
