import React from 'react';
import TextArea from '../atomic/textArea';
import Input from '../atomic/input';
import '../../../css/response.css';

const Response = ({ ticket }) => {
  return (
    <div
      className={`response-form ${
        ticket.mark ? 'ticketDetail_mark' : null
      }`}
    >
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
    </div>
  );
};

export default Response;
