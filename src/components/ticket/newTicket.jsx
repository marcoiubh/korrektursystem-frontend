import { saveTicket } from '../../services/ticketService';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { getFormattedTimestamp } from '../../services/getFormattedTimestamp';
import _ from 'lodash';
import NewTicketForm from '../subcomponents/composite/newTicketForm';

const NewTicket = ({ user }) => {
  const [ticket, setTicket] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setTicket({});
  }, []);

  const handleSave = async (e) => {
    // copy new value into existing values
    const ticketCopy = Object.assign(ticket, e);
    // associate student with the new ticket
    ticketCopy.student = user;
    ticketCopy.date = Date.now();
    ticketCopy.status = 'New';
    // new ticket has not been read by a professor
    ticketCopy.readProfessor = false;
    ticketCopy.readStudent = true;
    // instanciate history property as array of strings
    ticketCopy.history = [];
    ticketCopy.history.push(
      `${getFormattedTimestamp(Date.now())} - ${user} - ${
        ticket.title
      } - ${ticket.comment} - ${ticket.status}`
    );

    const response = toast.loading('Please wait...');
    await saveTicket(ticketCopy)
      .then(() => {
        toast.update(response, {
          render: 'Ticket has been created.',
          type: 'success',
          isLoading: false,
        });
        navigate('/ticket/overview');
      })
      .catch((err) => {
        toast.update(response, {
          render: err.response.data,
          closeOnClick: true,
          autoClose: 3000,
          type: 'error',
          isLoading: false,
        });
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

  const handleCancel = (e) => {
    navigate('/ticket/overview');
  };

  return (
    <div className="container">
      <div className="gy-3">
        <h1>New Ticket</h1>
      </div>
      <NewTicketForm
        ticket={ticket}
        onSave={debouncedHandleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default NewTicket;
