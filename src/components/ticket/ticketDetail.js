import React, { useState, useEffect } from 'react';
import config from '../../config/config.json';
import moment from 'moment';
import { ifUserIsStudent } from '../services/authenticationService';
import Pagination from '../subcomponents/pagination';
import Request from '../subcomponents/request';
import Response from '../subcomponents/response';
import { updateTicket } from '../services/ticketService';

const TicketDetail = ({
  ticket: propsticket,
  tickets,
  totalCount,
  onOverview,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ticket, setTicket] = useState(propsticket);

  useEffect(() => {
    const fetchData = async () => {
      setCurrentPage(
        // get index of the current ticket to determine page number
        tickets.map((t) => t._id).indexOf(ticket._id) + 1
      );
    };
    fetchData();
  }, [ticket, tickets, currentPage]);

  useEffect(() => {}, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTicket(tickets[page - 1]);
  };

  const handleSave = async (updates) => {
    // copy new value into existing values
    const ticketCopy = Object.assign(ticket, updates);
    // stores states
    setTicket(ticketCopy);
    // ticket gets updated if validation passes
    await updateTicket(ticket);
  };

  return (
    <div className="container">
      <div className="gy-3">
        <h1>Ticket status</h1>
        <p>Ticket number # {ticket._id} </p>
      </div>

      <div
        className="row g-1"
        style={{
          backgroundColor: 'lightgrey',
        }}
      >
        <div
          className="col-sm-5"
          style={{
            backgroundColor: '',
          }}
        >
          <Request
            date={moment(ticket.date).format(config.dateFormat)}
            ticket={ticket}
          />
          <button
            type="button"
            onClick={onOverview}
            className="btn btn-outline-primary small m-1"
          >
            Overview
          </button>
        </div>
        {!ifUserIsStudent() && (
          <div className="col-sm-5">
            <Response ticket={ticket} onSave={handleSave} />
          </div>
        )}
      </div>
      <Pagination
        itemsCount={totalCount}
        pageSize={1}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TicketDetail;
