import '../../../css/textArea.css';

const TextArea = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="textArea_main">
      <div className="textArea_label">
        <div className="textArea_text_frame">{property}</div>
      </div>
      <label id={property} className="textArea_text">
        {obj[property]}
      </label>
    </div>
  );
};

export default TextArea;
