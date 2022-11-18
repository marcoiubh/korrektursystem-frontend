import { getTicket, getTickets } from './services/ticketService';
import { paginate } from './subcomponents/paginate';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../config/config.json';
import Input from './subcomponents/input';
import moment from 'moment';
import Pagination from './subcomponents/pagination';
import React, { useEffect, useState } from 'react';
import TextArea from './subcomponents/textarea';

const TicketDetailsStudent = () => {
  // config.ticket required to avoid uncontrolled component errors
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleCancel = (e) => {
    navigate('/tickets');
  };

  return (
    <div className="container">
      <div className="gy-3">
        <h1>Ticket status</h1>
        <p>Ticket number # {params.id} </p>
      </div>

      <div className="row g-1">
        <div className="col-sm-3">
          <Input
            disabled={true}
            name="date"
            value={moment(ticket.date).format(config.dateFormat)}
          />
        </div>
        <div className="col-sm-4">
          <Input
            disabled={true}
            name="module"
            value={ticket.module}
          />
        </div>
        <div className="col-sm-5">
          <Input disabled={true} name="title" value={ticket.title} />
        </div>
      </div>

      <div className="row g-1">
        <div className="col-sm-6 ">
          <TextArea
            disabled={true}
            name="comment"
            value={ticket.comment}
          />
        </div>
        <div className="col-sm-6">
          <Input disabled={true} name="type" value={ticket.type} />
          <Input
            disabled={true}
            name="source"
            value={ticket.source}
          />
        </div>
      </div>

      <div className="row g-1">
        <div className="col-sm-6 ">
          <TextArea
            disabled={true}
            name="statement"
            value={ticket.statement}
          />
        </div>
        <div className="col-sm-6">
          <Input
            disabled={true}
            name="status"
            value={ticket.status}
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
          <button
            onClick={handleCancel}
            className="btn btn-outline-primary small m-1"
          >
            Overview
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsStudent;
