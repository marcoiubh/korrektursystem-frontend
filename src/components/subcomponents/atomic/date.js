import { getFormattedTimestamp } from '../../../services/getFormattedTimestamp';

const Date = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <span {...rest} className="input-group-text" id="basic-addon1">
        {property}
      </span>
      <label id={property} className="form-control">
        {getFormattedTimestamp(obj[property])}
      </label>
    </div>
  );
};

export default Date;
