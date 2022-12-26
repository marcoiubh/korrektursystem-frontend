import '../../../css/input.css';

const InputHook = ({ property, obj, register, errors, ...rest }) => {
  return (
    <div className="input_main">
      <div className="input_label">
        <div className="input_text_frame">{property}</div>
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
      <div className="invalid-feedback">
        {errors[property]?.message}
      </div>
    </div>
  );
};

export default InputHook;
