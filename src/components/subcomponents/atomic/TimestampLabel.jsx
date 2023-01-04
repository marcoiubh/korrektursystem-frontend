import { getFormattedDate } from '../../../services/getFormattedTimestamp';
import '../../../css/timestamp.css';

const TimestampLabel = ({ property, obj }) => {
  return (
    <div className="timestamp">
      <div className="timestamp__label">
        <span className="timestamp__text-frame">{property}</span>
      </div>
      <label id={property} className="timestamp__text">
        {getFormattedDate(obj[property])}
      </label>
    </div>
  );
};

export default TimestampLabel;
