import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from './table';

const TicketTable = ({ tickets, sortColumn, onEdit, onSort }) => {
  const [columns, setColumns] = useState([
    {
      key: 'date',
      data: 'date',
      label: 'Date',
    },
    {
      key: 'priority',
      data: 'priority',
      label: 'Priority',
    },
    {
      key: 'title',
      data: 'title',
      label: 'Title',
      //   content: (ticket) => (
      //     <Link to={`/tickets/${ticket._id}`}>{ticket.title}</Link>
      //   ),
    },
    {
      key: 'module',
      data: 'module',
      label: 'Module',
    },
    {
      key: 'type',
      data: 'type',
      label: 'Type',
    },
    {
      key: 'source',
      data: 'source',
      label: 'Source',
    },
    {
      key: 'status',
      data: 'status',
      label: 'Status',
    },
    {
      key: 'edit',
      content: (ticket) => (
        <button
          onClick={() => onEdit(ticket)}
          className="btn btn-primary"
        >
          Edit
        </button>
      ),
    },
  ]);
  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      data={tickets}
      onSort={onSort}
    />
  );
};

export default TicketTable;
