import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './subcomponents/input';
import {
  getTicket,
  saveTicket,
  updateTicket,
} from './services/ticketService';
import config from '../config/config.json';

const NewTicket = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [ticket, setTicket] = useState(config.ticket);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data: ticket } = await getTicket(params.id);
  //     setTicket(ticket[0]);
  //   };
  //   fetchData();
  // }, []);

  const handleSave = async (e) => {
    // prevents the browser to refresh
    e.preventDefault();

    // ticket gets updated if validation passes
    await saveTicket(ticket);
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
      <h1>New Ticket</h1>
      <form onSubmit={handleSave}>
        <Input
          name="date"
          value={ticket.date}
          onChange={handleChange}
        />
        <Input
          name="title"
          value={ticket.title}
          onChange={handleChange}
        />
        <Input
          name="module"
          value={ticket.module}
          onChange={handleChange}
        />
        <Input
          name="type"
          value={ticket.type}
          onChange={handleChange}
        />
        <Input
          name="source"
          value={ticket.source}
          onChange={handleChange}
        />
        <Input
          name="comment"
          value={ticket.comment}
          onChange={handleChange}
        />
        <button className="btn btn-outline-primary small m-2">
          Submit
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

export default NewTicket;
