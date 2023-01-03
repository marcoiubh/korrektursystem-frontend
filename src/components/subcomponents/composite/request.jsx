import React from 'react';
import TextArea from '../atomic/textArea';
import Label from '../atomic/label';
import Timestamp from '../atomic/timestamp';
import '../../../css/request.css';

const Request = ({ ticket }) => {
  return (
    <div
      className={`request__form ${
        ticket.mark ? 'ticketDetail__mark' : null
      }`}
    >
      <p className="request__form__heading">Student request</p>
      <div className="request__form__date">
        <Timestamp property="date" obj={ticket} disabled={true} />
      </div>
      <div className="request__form__module">
        <Label property="module" obj={ticket} />
      </div>
      <div className="request__form__title">
        <Label property="title" obj={ticket} />
      </div>
      <div className="request__form__student">
        <Label property="student" obj={ticket} />
      </div>
      <div className="request__form__comment">
        <TextArea property="comment" obj={ticket} />
      </div>
      <div className="request__form__type">
        <Label property="type" obj={ticket} />
      </div>
      <div className="request__form__source">
        <Label property="source" obj={ticket} />
      </div>
      <div className="request__form__history">
        <TextArea property="history" obj={ticket} />
      </div>
    </div>
  );
};

export default Request;
