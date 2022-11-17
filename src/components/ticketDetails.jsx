import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './subcomponents/input';
import { ifUserIsProfessor } from './services/authenticationService';
import { ifUserIsStudent } from './services/authenticationService';
import { getTicket, updateTicket } from './services/ticketService';
import config from '../config/config.json';
import TextArea from './subcomponents/textarea';

const TicketDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  // config.ticket required to avoid uncontrolled component errors
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
      <div className="gy-3">
        <h1>Ticket details</h1>
        <p>Ticket number # {params.id} </p>
      </div>
      <form onSubmit={handleSave}>
        <div className="row g-1">
          <div className="col-sm-3">
            <Input
              disabled={ifUserIsProfessor()}
              name="date"
              value={ticket.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-4">
            <Input
              disabled={ifUserIsProfessor()}
              name="module"
              value={ticket.module}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-5">
            <Input
              disabled={ifUserIsProfessor()}
              name="title"
              value={ticket.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row g-1">
          <div className="col-sm-6 ">
            <TextArea
              disabled={ifUserIsProfessor()}
              name="comment"
              value={ticket.comment}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-6">
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
          </div>
        </div>

        <div className="row g-1">
          <div className="col-sm-6 ">
            <TextArea
              disabled={ifUserIsStudent()}
              name="statement"
              value={ticket.statement}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-6">
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
          </div>
        </div>

        <div className="row-sm-0">
          <button className="btn btn-outline-primary small m-1 ">
            Save
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

export default TicketDetails;
