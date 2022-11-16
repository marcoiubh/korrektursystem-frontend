import React from 'react';

const Date = ({ name, label, error, ...rest }) => {
  return (
    <div className="col-5">
      <div className="input-group date" id="datepicker">
        <input type="text" className="form-control" id="date" />
        <span className="input-group-append">
          <span className="input-group-text bg-light d-block">
            <i className="fa fa-calendar"></i>
          </span>
        </span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Date;
