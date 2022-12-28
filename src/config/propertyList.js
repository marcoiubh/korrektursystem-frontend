import Button from '../components/subcomponents/atomic/button';
import { ifUserIsStudent } from '../services/authenticationService';
import { getFormattedTimestamp } from '../services/getFormattedTimestamp';
import '../css/ticketTable.css';

const getPropertyList = () => {
  return [
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
    {
      name: ifUserIsStudent() ? undefined : 'student',

      content: (ticket) => (
        // <label className="doNotDisplay">{ticket.student}</label>
        <label hidden={ifUserIsStudent()}>{ticket.student}</label>
      ),
    },
    {
      name: ifUserIsStudent() ? undefined : 'priority',

      content: (ticket) => (
        <label hidden={ifUserIsStudent()}>{ticket.priority}</label>
      ),
    },
  ];
};

export default getPropertyList;
