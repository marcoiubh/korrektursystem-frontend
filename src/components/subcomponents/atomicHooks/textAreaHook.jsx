import '../../../css/textArea.css';

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
      <div
        className={errors[property] ? 'textArea_error' : 'no_error'}
      >
        {errors[property]?.message}
      </div>
      <div className="textArea_label">
        <label className="textArea_text_frame" htmlFor={property}>
          {property}
        </label>
      </div>
      <textarea
        {...rest}
        name={property}
        id={property}
        defaultValue={obj[property]}
        {...register(property)}
        className={`textArea_text ${
          errors[property] ? 'is-invalid' : ''
        }`}
        rows="4"
      />
    </div>
  );
};

export default TextAreaHook;
