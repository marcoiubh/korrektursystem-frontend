import '../../../css/input.css';

const Input = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="input">
      <div {...rest} className="input__label">
        <div className="input__text-frame">{property}</div>
      </div>
      <label {...rest} id={property} className="input__text">
        {obj[property]}
      </label>
    </div>
  );
};

export default Input;
