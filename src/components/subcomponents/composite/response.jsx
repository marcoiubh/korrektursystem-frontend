import React from 'react';
import TextArea from '../atomic/textArea';
import Input from '../atomic/input';
import '../../../css/response.css';

const Response = ({ ticket }) => {
  return (
    <div
      className={`response__form ${
        ticket.mark ? 'ticketDetail_mark' : null
      }`}
    >
      <p className="response__form__heading">Professor response</p>
      <div className="response__form__statement">
        <TextArea property="statement" obj={ticket} disabled={true} />
      </div>
      <div className="response__form__priority">
        <Input property="priority" obj={ticket} disabled={true} />{' '}
      </div>
      <div className="response__form__status">
        <Input property="status" obj={ticket} disabled={true} />
      </div>
    </div>
  );
};

export default Response;
