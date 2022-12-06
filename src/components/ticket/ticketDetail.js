import React, { useState, useEffect } from 'react';
import {
  getCurrentRole,
  ifUserIsStudent,
} from '../services/authenticationService';
import Pagination from '../subcomponents/composite/pagination';
import Request from '../subcomponents/composite/request';
import Response from '../subcomponents/composite/response';
import { updateTicket } from '../services/ticketService';
import Button from '../subcomponents/atomic/button';
import { toast } from 'react-toastify';

const TicketDetail = ({
  user,
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

  useEffect(() => {
    const updateReadStatus = async () => {
      const ticketCopy = { ...ticket };

      if (getCurrentRole() === 'student')
        ticketCopy.readStudent = true;
      else if (getCurrentRole() === 'professor')
        ticketCopy.readProfessor = true;

      try {
        await updateTicket(ticketCopy);
      } catch (error) {
        toast.error('An error occured.');
      }
    };
    updateReadStatus();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTicket(tickets[page - 1]);
  };

  const handleSave = async (updates) => {
    // copy new value into existing values
    const ticketCopy = Object.assign(ticket, updates);
    ticketCopy.professor = user;
    ticketCopy.date = Date.now();

    // updated ticket has not been read by the student
    ticketCopy.readStudent = false;
    ticketCopy.readProfessor = true;
    try {
      await updateTicket(ticketCopy);
      toast.success('Changes has been saved.');
    } catch (error) {
      toast.error('An error occured.');
    }
  };

  return (
    <div className="container">
      <div className="gy-3">
        <h1>Ticket status</h1>
        <p>Ticket number # {ticket._id} </p>
      </div>

      <div className="row g-1">
        <div className="col-sm-5">
          <Request ticket={ticket} />
          <Button label="Overview" onClick={onOverview} />
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
