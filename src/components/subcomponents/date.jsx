import React from 'react';

const Date = ({ name, label, error, ...rest }) => {
  return (
    <div class="col-5">
      <div class="input-group date" id="datepicker">
        <input type="text" class="form-control" id="date" />
        <span class="input-group-append">
          <span class="input-group-text bg-light d-block">
            <i class="fa fa-calendar"></i>
          </span>
        </span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Date;
