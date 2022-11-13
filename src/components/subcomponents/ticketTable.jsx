import React, { useState } from 'react';
import Table from './table';
import Moment from 'react-moment';

const TicketTable = ({ tickets, sortColumn, onEdit, onSort }) => {
  const [columns, setColumns] = useState([
    {
      key: 'date',
      data: 'date',
      label: 'Date',
      content: (ticket) => (
        <Moment parse="YYYY/MM/DD">{ticket.date}</Moment>
      ),
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
      key: 'comment',
      data: 'comment',
      label: 'Comment',
    },
    {
      key: 'edit',
      content: (ticket) => (
        <button
          onClick={() => onEdit(ticket)}
          className="btn btn-primary m-2"
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
