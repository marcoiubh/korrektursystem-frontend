const InputHook = ({ property, obj, register, errors, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        {property}
      </span>
      <input
        {...rest}
        name={property}
        id={property}
        defaultValue={obj[property]}
        {...register(property)}
        className={`form-control ${
          errors[property] ? 'is-invalid' : ''
        }`}
      />
      <div className="invalid-feedback">
        {errors[property]?.message}
      </div>
    </div>
  );
};

export default InputHook;
