import { saveTicket } from '../../services/ticketService';
import { useNavigate } from 'react-router-dom';
import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import { getFormattedDate } from '../../services/getFormattedTimestamp';
import _ from 'lodash';
import RequestForm from '../subcomponents/composite/RequestForm';

const NewTicket = ({ user }) => {
  // initiate new ticket
  let ticket = {};
  const navigate = useNavigate();

  // save button
  const handleSave = async (inputValues) => {
    // store form field values and additional meta data
    ticket = {
      ...inputValues,
      // associate student with the new ticket
      student: user.email,
      date: Date.now(),
      status: 'New',
      // initiate priority and statement to avoid rerender issues
      // with undefined values
      priority: '',
      statement: '',
      // new ticket has not been read by a professor
      readProfessor: false,
      readStudent: true,
      history: `${getFormattedDate(Date.now())} : ${user.email} \n`,
    };

    // save ticket and wait for response
    await toast
      .promise(saveTicket(ticket), {
        // show notification based on response
        pending: 'Please wait...',
        success: 'Ticket has been created.',
        error: {
          render({ data: error }) {
            return error.response.data;
          },
        },
      })
      .then(() => {
        // return back to ticket overview
        navigate('/ticket/overview');
      });
  };

  // debounce save button
  const debouncedHandleSave = useMemo(
    () =>
      _.debounce(handleSave, 1000, {
        leading: true,
        trailing: false,
      }),
    []
  );

  // cancel button
  const handleCancel = () => {
    navigate('/ticket/overview');
  };

  return (
    <RequestForm
      ticket={ticket}
      onSave={debouncedHandleSave}
      onCancel={handleCancel}
    />
  );
};

export default NewTicket;
