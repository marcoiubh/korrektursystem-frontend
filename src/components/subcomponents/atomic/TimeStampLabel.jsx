import '../../../css/timestamp.css';

import { getFormattedDate } from '../../../services/getFormattedTimestamp';

const TimeStampLabel = ({ property, obj }) => {
  return (
    <div className='timestamp'>
      {/* label */}
      <div className='timestamp__label'>
        <span className='timestamp__text-frame'>{property}</span>
      </div>

      {/* date */}
      <label
        id={property}
        className='timestamp__text'
      >
        {/* convert ms to date */}
        {getFormattedDate(obj[property])}
      </label>
    </div>
  );
};

export default TimeStampLabel;
