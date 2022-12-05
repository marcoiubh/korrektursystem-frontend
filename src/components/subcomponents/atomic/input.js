const Input = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <span {...rest} className="input-group-text" id="basic-addon1">
        {property}
      </span>
      <label {...rest} id={property} className="form-control">
        {obj[property]}
      </label>
    </div>
  );
};

export default Input;
