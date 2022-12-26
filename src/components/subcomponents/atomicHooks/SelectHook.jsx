import '../../../css/select.css';

const SelectHook = ({
  property,
  obj,
  options,
  register,
  errors,
  ...rest
}) => {
  return (
    <div className="select_main">
      <div className="select_label">
        <div className="select_text_frame">{property}</div>
      </div>
      <select
        {...rest}
        name={property}
        id={property}
        defaultValue={obj[property]}
        {...register(property)}
        className={`select_text ${
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
