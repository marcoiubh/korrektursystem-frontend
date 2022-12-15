import '../../css/App.css';
import { saveTicket } from '../../services/ticketService';
import { useNavigate } from 'react-router-dom';
import config from '../../config/config.json';
import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import SelectHook from '../subcomponents/atomicHooks/SelectHook';
import TextAreaHook from '../subcomponents/atomicHooks/textAreaHook';
import InputHook from '../subcomponents/atomicHooks/InputHook';
import Button from '../subcomponents/atomic/button';
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

    try {
      await saveTicket(ticketCopy);
      toast.success('Ticket has been created.');
      navigate('/ticket/overview');
    } catch (error) {
      toast.error('An error occured.');
    }
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
