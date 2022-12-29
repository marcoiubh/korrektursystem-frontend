import '../../../css/input.css';

const Input = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="input_main">
      <div {...rest} className="input_label">
        <div className="input_text_frame">{property}</div>
      </div>
      <label {...rest} id={property} className="input_text">
        {obj[property]}
      </label>
    </div>
  );
};

export default Input;
