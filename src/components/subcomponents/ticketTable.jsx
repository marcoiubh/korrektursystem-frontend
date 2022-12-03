import { ifUserIsStudent } from '../services/authenticationService';
import config from '../../config/config.json';
import moment from 'moment';
import React, { useState } from 'react';
import Table from './table';

const TicketTable = ({
  onNew,
  onSort,
  onView,
  sortColumn,
  tickets,
}) => {
  const [columns] = useState([
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
      label: ifUserIsStudent() ? undefined : 'Student',

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
      key: 'view',
      content: (ticket) => (
        <button
          className="btn btn-outline-primary small m-2"
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
        hidden={!ifUserIsStudent()}
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
