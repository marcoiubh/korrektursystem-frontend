import '../../../css/select.css';

const SelectForm = ({ property, obj, options, register, errors, ...rest }) => {
  return (
    <div className='select'>
      {/* validation error message */}
      <div
        className={
          errors[property] ? 'select__error' : 'select__error--no-error'
        }
      >
        {errors[property]?.message}
      </div>

      {/* label */}
      <div className='select__label'>
        <label
          className='select__text-frame'
          htmlFor={property}
        >
          {property}
        </label>
      </div>

      {/* select */}
      <select
        {...rest}
        name={property}
        id={property}
        // display existing values
        defaultValue={obj[property]}
        // register to react hook form
        {...register(property)}
        className='select__text'
      >
        {/* default option */}
        <option></option>
        {/* more options */}
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
