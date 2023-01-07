import '../../../css/textArea.css';

const TextAreaLabel = ({ property, obj }) => {
  return (
    <div className='textArea'>
      {/* label */}
      <div className='textArea__label'>
        <span className='textArea__text-frame'>{property}</span>
      </div>

      {/* text */}
      <label
        id={property}
        className='textArea__text'
      >
        {obj[property]}
      </label>
    </div>
  );
};

export default TextAreaLabel;
