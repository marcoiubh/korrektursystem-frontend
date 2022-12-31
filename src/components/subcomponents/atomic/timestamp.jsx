import { getFormattedTimestamp } from '../../../services/getFormattedTimestamp';
import '../../../css/timestamp.css';

const Timestamp = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="timestamp">
      <div {...rest} className="timestamp__label">
        <div className="timestamp__text-frame">{property}</div>
      </div>
      <label id={property} className="timestamp__text">
        {getFormattedTimestamp(obj[property])}
      </label>
    </div>
  );
};

export default Timestamp;
