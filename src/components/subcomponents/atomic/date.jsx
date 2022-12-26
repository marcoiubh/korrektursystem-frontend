import { getFormattedTimestamp } from '../../../services/getFormattedTimestamp';
import '../../../css/date.css';

const Date = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="date_main">
      <div {...rest} className="date_label">
        <div className="date_text_frame">{property}</div>
      </div>
      <label id={property} className="date_text">
        {getFormattedTimestamp(obj[property])}
      </label>
    </div>
  );
};

export default Date;
