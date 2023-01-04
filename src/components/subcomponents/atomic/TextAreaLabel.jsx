import '../../../css/textArea.css';

const TextAreaLabel = ({ property, obj }) => {
  return (
    <div className="textArea">
      <div className="textArea__label">
        <span className="textArea__text-frame">{property}</span>
      </div>
      <label id={property} className="textArea__text">
        {obj[property]}
      </label>
    </div>
  );
};

export default TextAreaLabel;
