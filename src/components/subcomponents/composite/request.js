import React from 'react';
import TextArea from '../atomic/textArea';
import Input from '../atomic/input';
import { ifUserIsStudent } from '../../services/authenticationService';
import Date from '../atomic/date';

const Request = ({ ticket }) => {
  return (
    <div>
      <div className="row g-1">
        <div className="col-sm-3">
          <Date property="date" obj={ticket} disabled={true} />
        </div>
        <div className="col-sm-4">
          <Input property="module" obj={ticket} disabled={true} />
        </div>
        <div className="col-sm-5">
          <Input property="title" obj={ticket} disabled={true} />
        </div>
      </div>

      <div className="row g-1">
        <div className="col-sm-6 ">
          <TextArea property="comment" obj={ticket} disabled={true} />
        </div>
        <div className="col-sm-6">
          <Input property="type" obj={ticket} disabled={true} />

          <Input property="source" obj={ticket} disabled={true} />
        </div>
      </div>

      <div className="row g-1">
        <div className="col-sm-6 ">
          <TextArea
            property="statement"
            obj={ticket}
            disabled={true}
            hidden={!ifUserIsStudent()}
          />
        </div>
        <div className="col-sm-6">
          <Input
            property="status"
            obj={ticket}
            disabled={true}
            hidden={!ifUserIsStudent()}
          />
        </div>
      </div>
    </div>
  );
};

export default Request;
