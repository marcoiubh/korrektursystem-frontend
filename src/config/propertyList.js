import config from './config.json';
import moment from 'moment';
import Button from '../components/subcomponents/atomic/button';
import { ifUserIsStudent } from '../components/services/authenticationService';

const getPropertyList = ({ onView }) => {
  return [
    {
      content: (ticket) => {
        // notification if student or professor did not read ticket yet
        if (
          (ifUserIsStudent() && !ticket.readStudent) ||
          (!ifUserIsStudent() && !ticket.readProfessor)
        ) {
          return <p>NEW</p>;
        }
      },
    },
    {
      name: 'date',
      content: (ticket) => (
        <span>{moment(ticket.date).format(config.dateFormat)}</span>
      ),
    },
    {
      name: ifUserIsStudent() ? undefined : 'priority',

      content: (ticket) => (
        <label hidden={ifUserIsStudent()}>{ticket.priority}</label>
      ),
    },
    {
      name: 'title',
    },
    {
      name: ifUserIsStudent() ? undefined : 'student',

      content: (ticket) => (
        <label hidden={ifUserIsStudent()}>{ticket.student}</label>
      ),
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
      content: (ticket) => (
        <Button label="View" onClick={() => onView(ticket)} />
      ),
    },
  ];
};

export default getPropertyList;
