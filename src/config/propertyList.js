import { ifUserIsStudent } from '../services/authenticationService';
import { getFormattedTimestamp } from '../services/getFormattedTimestamp';

const getPropertyList = () => {
  const student = [
    {
      name: 'date',
      content: (ticket) => (
        <span>{getFormattedTimestamp(ticket.date)}</span>
      ),
    },

    {
      name: 'title',
    },

    {
      name: 'module',
    },
    {
      name: 'type',
    },
    {
      name: 'source',
    },
    {
      name: 'status',
    },
  ];

  const professor = [
    {
      name: 'date',
      content: (ticket) => (
        <span>{getFormattedTimestamp(ticket.date)}</span>
      ),
    },

    {
      name: 'priority',

      content: (ticket) => <label>{ticket.priority}</label>,
    },
    {
      name: 'student',

      content: (ticket) => <label>{ticket.student}</label>,
    },
    {
      name: 'title',
    },

    {
      name: 'module',
    },
    {
      name: 'type',
    },
    {
      name: 'source',
    },
    {
      name: 'status',
    },
  ];

  if (ifUserIsStudent()) return student;
  else return professor;
};

export default getPropertyList;
