import React from 'react';

const Request = ({ date, ticket }) => {
  return (
    <div>
      <div className="row g-1">
        <div className="col-sm-3">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Date
            </span>
            <input
              disabled
              type="text"
              name="date"
              value={date}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Module
            </span>
            <input
              disabled
              type="text"
              name="module"
              value={ticket.module}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-sm-5">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Title
            </span>
            <input
              disabled
              type="text"
              name="title"
              value={ticket.title}
              className="form-control"
            />
          </div>{' '}
        </div>
      </div>

      <div className="row g-1">
        <div className="col-sm-6 ">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Comment
            </span>
            <textarea
              disabled
              type="text"
              name="comment"
              value={ticket.comment}
              className="form-control"
              rows="4"
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Type
            </span>
            <input
              disabled
              type="text"
              name="type"
              value={ticket.type}
              className="form-control"
            />
          </div>
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Source
            </span>
            <input
              disabled
              type="text"
              name="source"
              value={ticket.source}
              className="form-control"
            />
          </div>
        </div>
      </div>

      <div className="row g-1">
        <div className="col-sm-6 ">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Statement
            </span>
            <textarea
              disabled
              type="text"
              name="statement"
              value={ticket.statement}
              className="form-control"
              rows="4"
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Status
            </span>
            <input
              disabled //={ifUserIsStudent()}
              type="text"
              name="status"
              value={ticket.status}
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;
