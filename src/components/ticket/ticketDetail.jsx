import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../subcomponents/composite/pagination';
import RequestLabel from '../subcomponents/composite/requestLabel';
import ResponseForm from '../subcomponents/composite/responseForm';
import { updateTicket } from '../../services/ticketService';
import Button from '../subcomponents/atomic/button';
import { toast } from 'react-toastify';
import { getFormattedDate } from '../../services/getFormattedTimestamp';
import _ from 'lodash';
import '../../css/ticketDetail.css';
import ResponseLabel from '../subcomponents/composite/responseLabel';

const TicketDetail = ({
  user,
  ticket: propsticket,
  tickets,
  totalCount,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ticket, setTicket] = useState(propsticket);
  let historyEntry = () => {
    return `____________________________________________________________________________________________________________\n  
    ${getFormattedDate(Date.now())} : ${user.email} - ${
      ticket.status
    } 
    ${ticket.statement}\n`;
  };

  const navigate = useNavigate();
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

      if (user.role === 'student') ticketCopy.readStudent = true;
      else if (user.role === 'professor')
        ticketCopy.readProfessor = true;

      try {
        await updateTicket(ticketCopy);
      } catch (error) {
        toast.error('An error occured.');
      }
    };
    if (!ticket.title) window.location = '/ticket/overview';
    else updateReadStatus();
  }, [ticket]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTicket(tickets[page - 1]);
  };

  const handleOverview = () => {
    navigate('/ticket/overview');
  };

  const handleSave = async (updates) => {
    // copy new value into existing values
    const ticketCopy = Object.assign(ticket, updates);
    ticketCopy.date = Date.now();

    // updated ticket has not been read by the student
    ticketCopy.readStudent = false;
    ticketCopy.readProfessor = true;

    ticketCopy.history.push(historyEntry());

    await toast.promise(updateTicket(ticketCopy), {
      pending: 'Please wait...',
      success: 'Changes has been saved.',
      error: {
        render({ data: error }) {
          return error.response.data;
        },
      },
    });
  };

  // debounce save button to avoid multiple calls when clicking quickly
  // useMemo keeps the debounce instance after rerendering the component
  const debouncedHandleSave = useMemo(
    () =>
      _.debounce(handleSave, 1000, {
        leading: true,
        trailing: false,
      }),
    []
  );

  return (
    <div className="ticketDetail">
      <div className="ticketDetail__pagination">
        <Pagination
          itemsCount={totalCount}
          pageSize={1}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="ticketDetail__overview">
        <Button label="Overview" onClick={handleOverview} />
      </div>

      <h1 className="ticketDetail__title">Ticket status</h1>
      <p className="ticketDetail__id">
        Ticket number # {ticket._id}{' '}
      </p>

      <div className="request">
        <RequestLabel ticket={ticket} />
      </div>

      {user.role === 'professor' ? (
        <div className="response">
          <ResponseForm
            ticket={ticket}
            onSave={debouncedHandleSave}
          />
        </div>
      ) : (
        <div className="response">
          <ResponseLabel ticket={ticket} />
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
