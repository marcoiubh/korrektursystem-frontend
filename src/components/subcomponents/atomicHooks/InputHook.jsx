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
      <div className={`input_label ${label_background}`}>
        <div className="input_text_frame">{property}</div>
      </div>
      <input
        {...rest}
        name={property}
        id={property}
        defaultValue={obj[property]}
        {...register(property)}
        className={`input_text ${text_background} ${
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
