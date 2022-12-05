import moment from 'moment';
import config from '../../../config/config.json';

const Date = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <span {...rest} className="input-group-text" id="basic-addon1">
        {property}
      </span>
      <label id={property} className="form-control">
        {moment(obj[property]).format(config.dateFormat)}
      </label>
    </div>
  );
};

export default Date;
