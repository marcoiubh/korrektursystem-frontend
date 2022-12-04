const TextArea = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <span {...rest} className="input-group-text" id="basic-addon1">
        {property}
      </span>
      <textarea
        {...rest}
        disabled={disabled}
        value={obj[property]}
        name={property}
        id={property}
        className="form-control"
        rows="4"
      />
    </div>
  );
};

export default TextArea;
