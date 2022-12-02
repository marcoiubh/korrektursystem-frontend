import { getTicket, getTickets } from './services/ticketService';
import { paginate } from './subcomponents/paginate';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../config/config.json';
import moment from 'moment';
import Pagination from './subcomponents/pagination';
import React, { useEffect, useState } from 'react';

const TicketDetailsStudent = () => {
  // config.ticket required to avoid uncontrolled component errors
  const [currentPage, setCurrentPage] = useState(1);
  const [ticket, setTicket] = useState(config.ticket);
  const [tickets, setTickets] = useState([config.ticket]);
  const [, setTicketsPaginated] = useState([config.ticket]);
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
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Date
            </span>
            <input
              disabled
              type="text"
              name="date"
              value={moment(ticket.date).format(config.dateFormat)}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Module
            </span>
            <input
              disabled
              type="text"
              name="module"
              value={ticket.module}
              className="form-control"
            />
          </div>
        </div>
        <div className="col-sm-5">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Title
            </span>
            <input
              disabled
              type="text"
              name="title"
              value={ticket.title}
              className="form-control"
            />
          </div>{' '}
        </div>
      </div>

      <div className="row g-1">
        <div className="col-sm-6 ">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Comment
            </span>
            <textarea
              disabled
              type="text"
              name="comment"
              value={ticket.comment}
              className="form-control"
              rows="4"
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Type
            </span>
            <input
              disabled
              type="text"
              name="type"
              value={ticket.type}
              className="form-control"
            />
          </div>
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Source
            </span>
            <input
              disabled
              type="text"
              name="source"
              value={ticket.source}
              className="form-control"
            />
          </div>
        </div>
      </div>

      <div className="row g-1">
        <div className="col-sm-6 ">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Statement
            </span>
            <textarea
              disabled
              type="text"
              name="statement"
              value={ticket.statement}
              className="form-control"
              rows="4"
            />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="input-group col-sm-6 mb-3">
            <span className="input-group-text" id="basic-addon1">
              Status
            </span>
            <input
              disabled
              type="text"
              name="status"
              value={ticket.status}
              className="form-control"
            />
          </div>
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
            type="button"
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
