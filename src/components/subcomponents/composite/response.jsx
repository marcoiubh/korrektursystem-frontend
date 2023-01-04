import React from 'react';
import TextArea from '../atomic/textArea';
import Label from '../atomic/label';
import '../../../css/response.css';

const Response = ({ ticket }) => {
  return (
    <div
      className={`response__form ${
        ticket.mark ? 'ticketDetail__mark' : null
      }`}
    >
      <p className="response__form__heading">Professor response</p>
      <div className="response__form__statement">
        <TextArea property="statement" obj={ticket} />
      </div>
      <div className="response__form__priority">
        <Label property="priority" obj={ticket} />
      </div>
      <div className="response__form__status">
        <Label property="status" obj={ticket} />
      </div>
    </div>
  );
};

export default Response;
