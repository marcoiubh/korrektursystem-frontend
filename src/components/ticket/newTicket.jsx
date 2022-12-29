import { saveTicket } from '../../services/ticketService';
import { useNavigate } from 'react-router-dom';
import React, { useMemo } from 'react';
import { toast } from 'react-toastify';
import { getFormattedTimestamp } from '../../services/getFormattedTimestamp';
import _ from 'lodash';
import RequestForm from '../subcomponents/composite/requestForm';
import '../../css/newTicket.css';

const NewTicket = ({ user }) => {
  let ticket = {};
  const navigate = useNavigate();

  const handleSave = async (inputValues) => {
    // copy new value into existing values
    ticket = inputValues;
    // associate student with the new ticket
    ticket.student = user.email;
    ticket.date = Date.now();
    ticket.status = 'New';
    // new ticket has not been read by a professor
    ticket.readProfessor = false;
    ticket.readStudent = true;
    // instanciate history property as array of strings
    ticket.history = [];
    ticket.history.push(
      `${getFormattedTimestamp(Date.now())} - ${user.email} - ${
        ticket.title
      } - ${ticket.comment} - ${ticket.status}`
    );

    await toast
      .promise(saveTicket(ticket), {
        pending: 'Please wait...',
        success: 'Ticket has been created.',
        error: {
          render({ data: error }) {
            return error.response.data;
          },
        },
      })
      .then(() => {
        navigate('/ticket/overview');
      });
  };

  const debouncedHandleSave = useMemo(
    () =>
      _.debounce(handleSave, 1000, {
        leading: true,
        trailing: false,
      }),
    []
  );

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
