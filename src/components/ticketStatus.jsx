import React, { useEffect, useState } from 'react';
import { getTicket } from './services/ticketService';
import { useParams } from 'react-router-dom';
import config from '../config/config.json';

const TicketStatus = () => {
  const params = useParams();
  // config.ticket required to avoid uncontrolled component errors
  const [ticket, setTicket] = useState(config.ticket);

  useEffect(() => {
    const fetchData = async () => {
      const { data: ticket } = await getTicket(params.id);
      setTicket(ticket[0]);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Ticket status</h1>
      <p>Ticket number # {params.id} </p>
      <p>Title: {ticket.title} </p>
      <p>Date: {ticket.date} </p>
    </div>
  );
};

export default TicketStatus;
