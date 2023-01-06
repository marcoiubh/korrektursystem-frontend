import '../../../css/input.css';

const InputForm = ({ property, obj, register, errors, ...rest }) => {
  return (
    <div className="input">
      {/* validation error message */}
      <div
        className={
          errors[property] ? 'input__error' : 'input__error--no-error'
        }
      >
        {errors[property]?.message}
      </div>

      {/* label */}
      <div className="input__label">
        <label className="input__text-frame" htmlFor={property}>
          {property}
        </label>
      </div>

      {/* input */}
      <input
        {...rest}
        name={property}
        id={property}
        // display existing values
        defaultValue={obj[property]}
        // register to react hook form
        {...register(property)}
        className="input__text"
      />
    </div>
  );
};

export default InputForm;
