const TextAreaHook = ({
  property,
  obj,
  text_background,
  register,
  errors,
  ...rest
}) => {
  return (
    <div className="textArea_main">
      <div className="textArea_label">
        <div className="textArea_text_frame">{property}</div>
      </div>
      <textarea
        {...rest}
        name={property}
        id={property}
        defaultValue={obj[property]}
        {...register(property)}
        className={`textArea_text ${text_background} ${
          errors[property] ? 'is-invalid' : ''
        }`}
        rows="4"
      />
      <div className="invalid-feedback">
        {errors[property]?.message}
      </div>
    </div>
  );
};

export default TextAreaHook;
