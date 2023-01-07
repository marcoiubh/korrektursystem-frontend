import React from 'react';

import '../../../css/response.css';

import InputLabel from '../atomic/InputLabel';
import TextAreaLabel from '../atomic/TextAreaLabel';

const ResponseLabel = ({ ticket }) => {
  return (
    <div
      className={`response__form ${ticket.mark ? 'ticketDetail__mark' : null}`}
    >
      <p className='response__form__heading'>Professor response</p>
      <div className='response__form__statement'>
        <TextAreaLabel
          property='statement'
          obj={ticket}
        />
      </div>
      <div className='response__form__priority'>
        <InputLabel
          property='priority'
          obj={ticket}
        />
      </div>
      <div className='response__form__status'>
        <InputLabel
          property='status'
          obj={ticket}
        />
      </div>
    </div>
  );
};

export default ResponseLabel;
