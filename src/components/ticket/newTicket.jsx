import { saveTicket } from '../../services/ticketService';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { getFormattedTimestamp } from '../../services/getFormattedTimestamp';
import _ from 'lodash';
import NewTicketForm from '../subcomponents/composite/newTicketForm';

const NewTicket = ({ user }) => {
  let ticket = {};
  const navigate = useNavigate();

  const handleSave = async (inputValues) => {
    // copy new value into existing values
    ticket = inputValues;
    // associate student with the new ticket
    ticket.student = user;
    ticket.date = Date.now();
    ticket.status = 'New';
    // new ticket has not been read by a professor
    ticket.readProfessor = false;
    ticket.readStudent = true;
    // instanciate history property as array of strings
    ticket.history = [];
    ticket.history.push(
      `${getFormattedTimestamp(Date.now())} - ${user} - ${
        ticket.title
      } - ${ticket.comment} - ${ticket.status}`
    );

    const response = toast.loading('Please wait...');
    await saveTicket(ticket)
      .then(() => {
        toast.update(response, {
          render: 'Ticket has been created.',
          type: 'success',
          isLoading: false,
        });
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
    navigate('/ticket/overview');
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
