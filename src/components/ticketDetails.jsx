import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './subcomponents/input';
import { ifUserIsProfessor } from './services/authenticationService';
import { ifUserIsStudent } from './services/authenticationService';
import { getTicket, updateTicket } from './services/ticketService';
import config from '../config/config.json';

const TicketDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [ticket, setTicket] = useState(config.ticket);

  useEffect(() => {
    const fetchData = async () => {
      const { data: ticket } = await getTicket(params.id);
      setTicket(ticket[0]);
    };
    fetchData();
  }, []);

  const handleSave = async (e) => {
    // prevents the browser to refresh
    e.preventDefault();

    // ticket gets updated if validation passes
    await updateTicket(ticket);
    navigate('/tickets');
  };

  // retrieves input from event.target.value
  const handleChange = ({ target: input }) => {
    // clones existing tickets
    const ticketCopy = { ...ticket };
    // associates field values with field names
    ticketCopy[input.name] = input.value;

    // stores states
    setTicket(ticketCopy);
  };

  const handleCancel = (e) => {
    navigate('/tickets');
  };

  return (
    <div className="container">
      <h1>Ticket details</h1>
      <p>Ticket number # {params.id} </p>
      <form onSubmit={handleSave}>
        <Input
          disabled={ifUserIsProfessor()}
          name="date"
          value={ticket.date}
          onChange={handleChange}
        />
        <Input
          disabled={ifUserIsProfessor()}
          name="title"
          value={ticket.title}
          onChange={handleChange}
        />
        <Input
          disabled={ifUserIsProfessor()}
          name="module"
          value={ticket.module}
          onChange={handleChange}
        />
        <Input
          disabled={ifUserIsProfessor()}
          name="type"
          value={ticket.type}
          onChange={handleChange}
        />
        <Input
          disabled={ifUserIsProfessor()}
          name="source"
          value={ticket.source}
          onChange={handleChange}
        />
        <Input
          disabled={ifUserIsProfessor()}
          name="comment"
          value={ticket.comment}
          onChange={handleChange}
        />
        <Input
          disabled={ifUserIsStudent()}
          name="priority"
          value={ticket.priority}
          onChange={handleChange}
        />
        <Input
          disabled={ifUserIsStudent()}
          name="status"
          value={ticket.status}
          onChange={handleChange}
        />
        <Input
          disabled={ifUserIsStudent()}
          name="statement"
          value={ticket.statement}
          onChange={handleChange}
        />
        <button className="btn btn-outline-primary small m-2">
          Save
        </button>
        <button
          onClick={handleCancel}
          className="btn btn-outline-primary small m-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default TicketDetails;
