import '../../../css/textArea.css';

const TextArea = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="textArea">
      <div className="textArea__label">
        <div className="textArea__text-frame">{property}</div>
      </div>
      <label id={property} className="textArea__text">
        {obj[property]}
      </label>
    </div>
  );
};

export default TextArea;
