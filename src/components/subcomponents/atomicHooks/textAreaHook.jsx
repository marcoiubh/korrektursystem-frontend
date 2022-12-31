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
    <div className="textArea">
      <div
        className={errors[property] ? 'textArea__error' : 'textArea__error--no-error'}
      >
        {errors[property]?.message}
      </div>
      <div className="textArea__label">
        <label className="textArea__text-frame" htmlFor={property}>
          {property}
        </label>
      </div>
      <textarea
        {...rest}
        name={property}
        id={property}
        defaultValue={obj[property]}
        {...register(property)}
        className={`textArea__text ${
          errors[property] ? 'is-invalid' : ''
        }`}
        rows="4"
      />
    </div>
  );
};

export default TextAreaHook;
