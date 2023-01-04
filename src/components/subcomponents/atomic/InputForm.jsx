import '../../../css/input.css';

const InputForm = ({ property, obj, register, errors, ...rest }) => {
  return (
    <div className="input">
      <div
        className={
          errors[property] ? 'input__error' : 'input__error--no-error'
        }
      >
        {errors[property]?.message}
      </div>
      <div className="input__label">
        <label className="input__text-frame" htmlFor={property}>
          {property}
        </label>
      </div>
      <input
        {...rest}
        name={property}
        id={property}
        defaultValue={obj[property]}
        {...register(property)}
        className="input__text"
      />
    </div>
  );
};

export default InputForm;
