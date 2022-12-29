import '../../../css/input.css';

const InputHook = ({
  property,
  obj,
  label_background,
  text_background,
  register,
  errors,
  ...rest
}) => {
  return (
    <div className="input_main">
      <div className={errors[property] ? 'input_error' : 'no_error'}>
        {errors[property]?.message}
      </div>
      <div className="input_label">
        <label className="input_text_frame" htmlFor={property}>
          {property}
        </label>
      </div>
      <input
        {...rest}
        name={property}
        id={property}
        defaultValue={obj[property]}
        {...register(property)}
        className={`input_text ${
          errors[property] ? 'is-invalid' : ''
        }`}
      />
    </div>
  );
};

export default InputHook;
