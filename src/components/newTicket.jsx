import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './subcomponents/input';
import {
  getTicket,
  saveTicket,
  updateTicket,
} from './services/ticketService';
import config from '../config/config.json';
import TextArea from './subcomponents/textarea';
import '../css/App.css';

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

  const divStyle = {
    backgroundColor: 'blue',
  };

  return (
    <div className="container">
      <div className="gy-3">
        <h1>New Ticket</h1>
      </div>
      <form onSubmit={handleSave}>
        <div className="row g-1">
          <div style={divStyle} className="col-sm-3">
            <Input
              name="date"
              value={ticket.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-4">
            <Input
              name="module"
              value={ticket.module}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-5">
            <Input
              name="title"
              value={ticket.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row g-1">
          <div className="col-sm-6 ">
            <TextArea
              name="comment"
              value={ticket.comment}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-6">
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
          </div>
        </div>
        <div className="row-sm-0">
          <button className="btn btn-outline-primary small m-1">
            Submit
          </button>
          <button
            onClick={handleCancel}
            className="btn btn-outline-primary small m-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
