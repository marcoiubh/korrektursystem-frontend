import '../../../css/select.css';

const SelectForm = ({
  property,
  obj,
  options,
  register,
  errors,
  ...rest
}) => {
  return (
    <div className="select">
      <div
        className={
          errors[property]
            ? 'select__error'
            : 'select__error--no-error'
        }
      >
        {errors[property]?.message}
      </div>
      <div className="select__label">
        <label className="select__text-frame" htmlFor={property}>
          {property}
        </label>
      </div>
      <select
        {...rest}
        name={property}
        id={property}
        defaultValue={obj[property]}
        {...register(property)}
        className="select__text"
      >
        <option></option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
