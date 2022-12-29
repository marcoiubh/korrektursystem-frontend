import React from 'react';
import TextArea from '../atomic/textArea';
import Input from '../atomic/input';
import { ifUserIsStudent } from '../../../services/authenticationService';
import Date from '../atomic/date';
import '../../../css/response.css';

const Response = ({ ticket }) => {
  return (
    <>
      <p className="response_header">Professor response</p>
      <div className="response_statement">
        <TextArea property="statement" obj={ticket} disabled={true} />
      </div>
      <div className="response_priority">
        <Input property="priority" obj={ticket} disabled={true} />{' '}
      </div>
      <div className="response_status">
        <Input property="status" obj={ticket} disabled={true} />
      </div>
    </>
  );
};

export default Response;
