import '../css/App.css';
import { getCurrentUser } from './services/authenticationService';
import { saveTicket } from './services/ticketService';
import { useNavigate } from 'react-router-dom';
import config from '../config/config.json';
import Input from './subcomponents/input';
import React, { useState } from 'react';
import Select from './subcomponents/select';
import TextArea from './subcomponents/textarea';

const NewTicket = () => {
  // config.ticket required to avoid uncontrolled component errors
  const [module, setModule] = useState(config.module);
  const [source, setSource] = useState(config.source);
  const [ticket, setTicket] = useState(config.ticket);
  const [type, setType] = useState(config.type);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    // prevents the browser to refresh
    e.preventDefault();
    // add current student to the ticket
    const ticketCopy = { ...ticket };
    ticketCopy.student = getCurrentUser();

    // ticket gets updated if validation passes
    await saveTicket(ticketCopy);
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

  const handleStatus = ({ target: input }) => {
    // clones existing tickets
    const ticketCopy = { ...ticket };
    // associates field values with field names
    ticketCopy[input.name] = input.value;

    // stores states
    setTicket(ticketCopy);
  };

  const divStyle = {
    backgroundColor: 'blue',
  };
  {
    /* style={divStyle}  */
  }

  return (
    <div className="container">
      <div className="gy-3">
        <h1>New Ticket</h1>
      </div>
      <form onSubmit={handleSave}>
        <div className="row g-1">
          <div className="col-sm-4">
            <Select
              name="module"
              options={module}
              value={ticket.module}
              onChange={handleStatus}
            />
          </div>
          <div className="col-sm-6">
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
            <Select
              name="type"
              options={type}
              value={ticket.type}
              onChange={handleStatus}
            />
            <Select
              name="source"
              options={source}
              value={ticket.source}
              onChange={handleStatus}
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
