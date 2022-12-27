import React from 'react';
import TextArea from '../atomic/textArea';
import Input from '../atomic/input';
import { ifUserIsStudent } from '../../../services/authenticationService';
import Date from '../atomic/date';
import '../../../css/request.css';

const Request = ({ ticket }) => {
  return (
    <>
      <div className="request_date">
        <Date property="date" obj={ticket} disabled={true} />
      </div>
      <div className="request_module">
        <Input property="module" obj={ticket} disabled={true} />
      </div>
      <div className="request_title">
        <Input property="title" obj={ticket} disabled={true} />
      </div>

      <div className="request_student">
        <Input property="student" obj={ticket} disabled={true} />
      </div>
      <div className="request_comment">
        <TextArea property="comment" obj={ticket} disabled={true} />
      </div>
      <div className="request_type">
        <Input property="type" obj={ticket} disabled={true} />
      </div>
      <div className="request_source">
        <Input property="source" obj={ticket} disabled={true} />{' '}
      </div>

      {/* {ifUserIsStudent() ? (
        <>
          <div className="">
            <TextArea
              property="statement"
              obj={ticket}
              disabled={true}
              hidden={!ifUserIsStudent()}
            />
          </div>
          <div className="">
            <Input
              property="status"
              obj={ticket}
              disabled={true}
              hidden={!ifUserIsStudent()}
            />
          </div>
        </>
      ) : null} */}

      <div className="request_history">
        <TextArea property="history" obj={ticket} />
      </div>
    </>
  );
};

export default Request;
