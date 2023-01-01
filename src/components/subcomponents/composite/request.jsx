import React from 'react';
import TextArea from '../atomic/textArea';
import Input from '../atomic/input';
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
        <Input property="module" obj={ticket} disabled={true} />
      </div>
      <div className="request__form__title">
        <Input property="title" obj={ticket} disabled={true} />
      </div>
      <div className="request__form__student">
        <Input property="student" obj={ticket} disabled={true} />
      </div>
      <div className="request__form__comment">
        <TextArea property="comment" obj={ticket} disabled={true} />
      </div>
      <div className="request__form__type">
        <Input property="type" obj={ticket} disabled={true} />
      </div>
      <div className="request__form__source">
        <Input property="source" obj={ticket} disabled={true} />{' '}
      </div>
      <div className="request__form__history">
        <TextArea property="history" obj={ticket} />
      </div>
    </div>
  );
};

export default Request;
