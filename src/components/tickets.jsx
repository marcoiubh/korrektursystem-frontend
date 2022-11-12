import React, { useState, useEffect } from 'react';
import TicketTable from './subcomponents/ticketTable';
import { getTickets } from './util/database';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
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
    navigate(`/tickets/${ticket.id}`);
    console.log('edited');
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
