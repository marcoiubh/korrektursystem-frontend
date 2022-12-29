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
      <div className={errors[property] ? 'select_error' : 'no_error'}>
        {errors[property]?.message}
      </div>
      <div className="select_label">
        <label className="select_text_frame" htmlFor={property}>
          {property}
        </label>
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
        <option></option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectHook;
