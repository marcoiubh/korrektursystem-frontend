import '../../../css/textArea.css';

const TextAreaForm = ({ property, obj, register, errors, ...rest }) => {
  return (
    <div className='textArea'>
      {/* validation error message */}
      <div
        className={
          errors[property] ? 'textArea__error' : 'textArea__error--no-error'
        }
      >
        {errors[property]?.message}
      </div>

      {/* label */}
      <div className='textArea__label'>
        <label
          className='textArea__text-frame'
          htmlFor={property}
        >
          {property}
        </label>
      </div>

      {/* text */}
      <textarea
        {...rest}
        name={property}
        id={property}
        // display existing values
        defaultValue={obj[property]}
        // register to react hook form
        {...register(property)}
        className='textArea__text'
      />
    </div>
  );
};

export default TextAreaForm;
