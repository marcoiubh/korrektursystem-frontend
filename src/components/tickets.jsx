import React, { useState, useEffect } from 'react';
import TicketTable from './subcomponents/ticketTable';
import { getTickets } from './services/ticketService';
import { useNavigate } from 'react-router-dom';
import config from '../config/config.json';

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([config.ticket]);
  const [sortColumn, setSortColumn] = useState({
    column: 'title',
    order: 'asc',
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: tickets } = await getTickets();
      setTickets(tickets);
    };
    fetchData();
  }, []);

  const handleEdit = (ticket) => {
    navigate(`/tickets/${ticket._id}`);
  };

  const handleSort = (e) => {
    console.log('sorted');
  };
  return (
    <div>
      <h1>Tickets</h1>
      <TicketTable
        tickets={tickets}
        sortColumn={sortColumn}
        onEdit={handleEdit}
        onSort={handleSort}
      />
    </div>
  );
};

export default Tickets;
