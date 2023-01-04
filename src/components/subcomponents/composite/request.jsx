import React from 'react';
import TextAreaLabel from '../atomic/TextAreaLabel';
import InputLabel from '../atomic/InputLabel';
import TimestampLabel from '../atomic/TimestampLabel';
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
        <TimestampLabel property="date" obj={ticket} />
      </div>
      <div className="request__form__module">
        <InputLabel property="module" obj={ticket} />
      </div>
      <div className="request__form__title">
        <InputLabel property="title" obj={ticket} />
      </div>
      <div className="request__form__student">
        <InputLabel property="student" obj={ticket} />
      </div>
      <div className="request__form__comment">
        <TextAreaLabel property="comment" obj={ticket} />
      </div>
      <div className="request__form__type">
        <InputLabel property="type" obj={ticket} />
      </div>
      <div className="request__form__source">
        <InputLabel property="source" obj={ticket} />
      </div>
      <div className="request__form__history">
        <TextAreaLabel property="history" obj={ticket} />
      </div>
    </div>
  );
};

export default Request;
