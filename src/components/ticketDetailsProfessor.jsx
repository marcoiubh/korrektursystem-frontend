import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './subcomponents/input';
import { ifUserIsProfessor } from './services/authenticationService';
import { ifUserIsStudent } from './services/authenticationService';
import {
  getTicket,
  updateTicket,
  getTickets,
} from './services/ticketService';
import config from '../config/config.json';
import TextArea from './subcomponents/textarea';
import moment from 'moment';
import { paginate } from './subcomponents/paginate';
import Pagination from './subcomponents/pagination';
import Select from './subcomponents/select';

const TicketDetailsProfessor = () => {
  // config.ticket required to avoid uncontrolled component errors
  const [currentPage, setCurrentPage] = useState(1);
  const [priority, setPriority] = useState(config.priority);
  const [status, setStatus] = useState(config.status);
  const [ticket, setTicket] = useState(config.ticket);
  const [tickets, setTickets] = useState([config.ticket]);
  const [ticketsPaginated, setTicketsPaginated] = useState([
    config.ticket,
  ]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data: ticket } = await getTicket(params.id);
      const { data: tickets } = await getTickets();
      setTickets(tickets);
      setTicket(ticket[0]);
      setCurrentPage(
        tickets.map((t) => t._id).indexOf(ticket[0]._id) + 1
      );
      setTicketsPaginated(paginate(tickets, currentPage, '1'));
      setTotalCount(tickets.length);
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTicket(tickets[page - 1]);
  };

  const handleSave = async (e) => {
    // prevents the browser to refresh
    e.preventDefault();

    // ticket gets updated if validation passes
    updateTicket(ticket);
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

  return (
    <div className="container">
      <div className="gy-3">
        <h1>Ticket details</h1>
        <p>Ticket number # {ticket._id} </p>
      </div>
      <form onSubmit={handleSave}>
        <div className="row g-1">
          <div className="col-sm-3">
            <Input
              disabled={ifUserIsProfessor()}
              name="date"
              value={moment(ticket.date).format('MMMM Do YYYY')}
              onChange={handleChange}
            />
          </div>
          <div className="col-sm-4">
            <Input
              disabled={ifUserIsProfessor()}
              name="module"
              value={ticket.module}
              onChange={handleStatus}
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
              onChange={handleStatus}
            />
            <Input
              disabled={ifUserIsProfessor()}
              name="source"
              value={ticket.source}
              onChange={handleStatus}
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
            <Select
              disabled={ifUserIsStudent()}
              name="priority"
              options={priority}
              value={ticket.priority}
              onChange={handleStatus}
            />
            <Select
              disabled={ifUserIsStudent()}
              name="status"
              options={status}
              value={ticket.status}
              onChange={handleStatus}
            />
          </div>
        </div>

        <div className="row-sm-0">
          <div className="col-sm-6">
            <Pagination
              itemsCount={totalCount}
              pageSize={1}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
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
        </div>
      </form>
    </div>
  );
};

export default TicketDetailsProfessor;
