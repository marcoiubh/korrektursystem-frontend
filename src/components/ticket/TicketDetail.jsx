import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import _ from 'lodash';

import '../../css/ticketDetail.css';

import { getFormattedDate } from '../../services/getFormattedTimestamp';
import { updateTicket } from '../../services/ticketService';
import Button from '../subcomponents/atomic/Button';
import Pagination from '../subcomponents/composite/Pagination';
import RequestLabel from '../subcomponents/composite/RequestLabel';
import ResponseForm from '../subcomponents/composite/ResponseForm';
import ResponseLabel from '../subcomponents/composite/ResponseLabel';

const TicketDetail = ({ user, ticket: propsticket, tickets, totalCount }) => {
  const [ticket, _setTicket] = useState(propsticket);
  const [currentPage, setCurrentPage] = useState(
    // calculate current page based in ticket index
    tickets.map((t) => t._id).indexOf(ticket._id) + 1
  );

  // initiate ref element to access state from
  // within event handler
  const ticketRef = useRef(ticket);

  // proxy setTicket and store current ref value
  const setTicket = (ticket) => {
    ticketRef.current = ticket;
    _setTicket(ticket);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // update read status of current ticket
    const updateReadStatus = async () => {
      // shallow copy of ticket
      const ticketCopy = { ...ticket };
      // set read status based on user role
      if (user.role === 'student') ticketCopy.readStudent = true;
      else if (user.role === 'professor') ticketCopy.readProfessor = true;

      // update ticket and wait for response
      await toast.promise(updateTicket(ticketCopy), {
        // show notification on error
        error: {
          render({ data: error }) {
            return error.response.data;
          },
        },
      });
    };

    // reload overview if component did not load data
    if (!ticket.title) window.location = '/ticket/overview';
    else updateReadStatus();
  }, [ticket]);

  // page button
  const handlePageChange = (page) => {
    // update current page and select associated ticket from tickets
    setCurrentPage(page);
    setTicket(tickets[page - 1]);
  };

  // overview button
  const handleOverview = () => {
    navigate('/ticket/overview');
  };

  // save button
  const handleSave = async (update) => {
    // copy new value into existing values
    const newTicket = {
      // useRef makes it possible to access state within the handler
      ...ticketRef.current,
      ...update,
    };

    // store metadata
    newTicket.date = Date.now();
    // updated ticket has not been read by the student
    newTicket.readStudent = false;
    newTicket.readProfessor = true;

    let historyEntry = () => {
      return `____________________________________________________________________________________________________________\n  
      ${getFormattedDate(Date.now())} : ${user.email} - ${newTicket.status} 
      ${newTicket.statement}\n`;
    };

    newTicket.history.push(historyEntry());

    // update ticket and wait for response
    await toast.promise(updateTicket(newTicket), {
      // show notification based on response
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
    <div className='ticketDetail'>
      {/* pagination */}
      <div className='ticketDetail__pagination'>
        <Pagination
          itemsCount={totalCount}
          pageSize={1}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      {/* overview button */}
      <div className='ticketDetail__overview'>
        <Button
          label='Overview'
          onClick={handleOverview}
        />
      </div>

      {/* heading */}
      <h1 className='ticketDetail__title'>Ticket status</h1>

      {/* ticket id */}
      <p className='ticketDetail__id'>Ticket number # {ticket._id} </p>

      {/* read only request block */}
      <div className='request'>
        <RequestLabel ticket={ticket} />
      </div>

      {user.role === 'professor' ? (
        // response form blick
        <div className='response'>
          <ResponseForm
            ticket={ticket}
            onSave={debouncedHandleSave}
          />
        </div>
      ) : (
        //  read only response block
        <div className='response'>
          <ResponseLabel ticket={ticket} />
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
