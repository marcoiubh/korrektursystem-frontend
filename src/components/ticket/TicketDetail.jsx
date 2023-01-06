import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../subcomponents/composite/Pagination';
import RequestLabel from '../subcomponents/composite/RequestLabel';
import ResponseForm from '../subcomponents/composite/ResponseForm';
import { updateTicket } from '../../services/ticketService';
import Button from '../subcomponents/atomic/Button';
import { toast } from 'react-toastify';
import { getFormattedDate } from '../../services/getFormattedTimestamp';
import _ from 'lodash';
import '../../css/ticketDetail.css';
import ResponseLabel from '../subcomponents/composite/ResponseLabel';

const TicketDetail = ({
  user,
  ticket: propsticket,
  tickets,
  totalCount,
}) => {
  const [ticket, _setTicket] = useState(propsticket);
  const [currentPage, setCurrentPage] = useState(
    tickets.map((t) => t._id).indexOf(ticket._id) + 1
  );
  const ticketRef = useRef(ticket);

  const setTicket = (ticket) => {
    ticketRef.current = ticket;
    _setTicket(ticket);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const updateReadStatus = async () => {
      const ticketCopy = { ...ticket };

      if (user.role === 'student') ticketCopy.readStudent = true;
      else if (user.role === 'professor')
        ticketCopy.readProfessor = true;

      await toast.promise(updateTicket(ticketCopy), {
        // pending: 'Please wait...',
        // success: 'Changes have been saved.',
        error: {
          render({ data: error }) {
            return error.response.data;
          },
        },
      });
      // try {
      //   await updateTicket(ticketCopy);
      // } catch (error) {
      //   toast.error('An error occured.', response.data);
      // }
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

  const handleSave = async (update) => {
    // copy new value into existing values
    const newTicket = {
      // useRef makes it possible to access state within the handler
      ...ticketRef.current,
      ...update,
    };
    newTicket.date = Date.now();
    // updated ticket has not been read by the student
    newTicket.readStudent = false;
    newTicket.readProfessor = true;

    let historyEntry = () => {
      return `____________________________________________________________________________________________________________\n  
      ${getFormattedDate(Date.now())} : ${user.email} - ${
        newTicket.status
      } 
      ${newTicket.statement}\n`;
    };

    newTicket.history.push(historyEntry());

    await toast.promise(updateTicket(newTicket), {
      pending: 'Please wait...',
      success: 'Changes have been saved.',
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
