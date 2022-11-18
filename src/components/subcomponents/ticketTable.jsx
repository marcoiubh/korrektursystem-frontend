import {
  ifUserIsProfessor,
  ifUserIsStudent,
} from '../services/authenticationService';
import config from '../../config/config.json';
import moment from 'moment';
import React, { useState } from 'react';
import Table from './table';

const TicketTable = ({
  onEdit,
  onNew,
  onSort,
  onView,
  sortColumn,
  tickets,
}) => {
  const [columns, setColumns] = useState([
    {
      key: 'date',
      data: 'date',
      label: 'Date',
      content: (ticket) => (
        <span>{moment(ticket.date).format(config.dateFormat)}</span>
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
    },
    {
      key: 'student',
      label: ifUserIsProfessor() ? 'Student' : undefined,

      content: (ticket) => (
        <label hidden={ifUserIsStudent()}>{ticket.student}</label>
      ),
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
          className="btn btn-outline-primary small m-2"
          hidden={ifUserIsStudent()}
          onClick={() => onEdit(ticket)}
        >
          Edit
        </button>
      ),
    },
    {
      key: 'view',
      content: (ticket) => (
        <button
          className="btn btn-outline-primary small m-2"
          hidden={ifUserIsProfessor()}
          onClick={() => onView(ticket)}
        >
          View
        </button>
      ),
    },
  ]);

  return (
    <div>
      <button
        className="btn btn-outline-primary"
        hidden={ifUserIsProfessor()}
        onClick={onNew}
      >
        New Ticket
      </button>
      <Table
        columns={columns}
        data={tickets}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    </div>
  );
};

export default TicketTable;
