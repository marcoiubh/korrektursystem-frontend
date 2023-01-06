import '../../../css/input.css';

const InputLabel = ({ property, obj }) => {
  return (
    <div className="input">
      {/* label */}
      <div className="input__label">
        <span className="input__text-frame">{property}</span>
      </div>

      {/* text */}
      <span id={property} className="input__text">
        {obj[property]}
      </span>
    </div>
  );
};

export default InputLabel;
