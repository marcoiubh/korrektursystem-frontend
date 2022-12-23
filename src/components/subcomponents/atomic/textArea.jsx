const TextArea = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <span {...rest} className="input-group-text" id="basic-addon1">
        {property}
      </span>
      {/* css-fix to force line breaks */}
      <label {...rest} id={property} className="form-control css-fix">
        {obj[property]}
      </label>
    </div>
  );
};

export default TextArea;
