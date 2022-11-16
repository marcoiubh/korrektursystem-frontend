import React, { useState } from 'react';
import Table from './table';
import Moment from 'react-moment';
import {
  getCurrentRole,
  ifUserIsProfessor,
  ifUserIsStudent,
} from '../services/authenticationService';

const TicketTable = ({
  tickets,
  sortColumn,
  onEdit,
  onSort,
  onNew,
  onView,
}) => {
  const [columns, setColumns] = useState([
    {
      key: 'date',
      data: 'date',
      label: 'Date',
      // content: (ticket) => (
      //   <Moment format="YYYY/MM/DD">{ticket.date}</Moment>
      // ),
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
          hidden={ifUserIsStudent()}
          onClick={() => onEdit(ticket)}
          className="btn btn-outline-primary small m-2"
        >
          Edit
        </button>
      ),
    },
    {
      key: 'view',
      content: (ticket) => (
        <button
          hidden={ifUserIsProfessor()}
          onClick={() => onView(ticket)}
          className="btn btn-outline-primary small m-2"
        >
          View
        </button>
      ),
    },
  ]);

  return (
    <div>
      <button
        hidden={ifUserIsProfessor()}
        onClick={onNew}
        className="btn btn-outline-primary"
      >
        New Ticket
      </button>
      <Table
        columns={columns}
        sortColumn={sortColumn}
        data={tickets}
        onSort={onSort}
      />
    </div>
  );
};

export default TicketTable;
