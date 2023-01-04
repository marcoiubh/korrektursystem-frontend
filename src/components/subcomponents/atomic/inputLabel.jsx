import '../../../css/input.css';

const InputLabel = ({ property, obj }) => {
  return (
    <div className="input">
      <div className="input__label">
        <span className="input__text-frame">{property}</span>
      </div>
      <span id={property} className="input__text">
        {obj[property]}
      </span>
    </div>
  );
};

export default InputLabel;
