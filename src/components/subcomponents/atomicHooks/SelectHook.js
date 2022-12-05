const SelectHook = ({
  property,
  obj,
  options,
  register,
  errors,
  ...rest
}) => {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        {property}
      </span>
      <select
        {...rest}
        name={property}
        id={property}
        defaultValue={obj[property]}
        {...register(property)}
        className={`form-select ${
          errors[property] ? 'is-invalid' : ''
        }`}
      >
        <option>{property}</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <div className="invalid-feedback">
        {errors[property]?.message}
      </div>
    </div>
  );
};

export default SelectHook;
