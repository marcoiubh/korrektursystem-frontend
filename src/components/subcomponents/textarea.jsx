import React from 'react';

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{name}</label>
      <textarea
        {...rest}
        placeholder={`Please enter a ${name}`}
        className="form-control"
        id={name}
        rows="3"
      ></textarea>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
