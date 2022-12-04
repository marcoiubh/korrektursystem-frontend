import moment from 'moment';
import config from '../../../config/config.json';

const Date = ({ property, obj, disabled, ...rest }) => {
  return (
    <div className="input-group mb-3">
      <span {...rest} className="input-group-text" id="basic-addon1">
        {property}
      </span>
      <input
        {...rest}
        disabled={disabled}
        value={moment(obj[property]).format(config.dateFormat)}
        name={property}
        id={property}
        className="form-control"
      />
    </div>
  );
};

export default Date;
