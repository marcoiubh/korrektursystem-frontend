import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TicketOverview from './ticketOverview';
import TicketDetail from './ticketDetail';
import config from '../../config/config';
import { paginate } from '../../services/paginate';
import { getTickets } from '../../services/ticketService';
import { search } from '../../services/search';
import { sort } from '../../services/sort';
import Home from '../home';
import { toast } from 'react-toastify';
import { quitSession } from '../../services/authenticationService';
import { markNewTickets } from '../../services/markNewTickets';
import { updateTicket } from '../../services/ticketService';

import { getFormattedDate } from '../../services/getFormattedTimestamp';

import _ from 'lodash';

const Ticket = ({ user, time }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDetailPage, setCurrentDetailPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState(config.sortColumn);
  const [tickets, setTickets] = useState([{ mark: false }]);
  const [pagedTicketsOnly, setPagedTicketsOnly] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const prepareTickets = async () => {
      const fetchedTickets = await fetchTickets();
      const filteredTickets = search(fetchedTickets, searchQuery);
      setTotalCount(filteredTickets.length);
      const sortedTickets = sort(filteredTickets, sortColumn);

      const markedTickets = markNewTickets(sortedTickets, user);
      setTickets(markedTickets);
      const paginatedTickets = paginate(
        markedTickets,
        currentPage,
        pageSize
      );
      setPagedTicketsOnly(paginatedTickets);
    };

    const fetchTickets = async () => {
      try {
        const { data } = await getTickets();
        return data;
      } catch (error) {
        if (error) toast.error(error.message);
        if (error.response.status === 401) quitSession();
      }
    };

    prepareTickets();
  }, [
    time,
    user,
    ticket,
    currentDetailPage,
    pageSize,
    sortColumn,
    searchQuery,
  ]);

  let historyEntry = () => {
    return `____________________________________________________________________________________________________________\n  
    ${getFormattedDate(Date.now())} : ${user.email} - ${
      ticket.status
    } 
    ${ticket.statement}\n`;
  };

  // EventHandler
  const handleView = (ticket) => {
    setTicket(ticket);
    setCurrentDetailPage(
      // get index of the current ticket to determine page number
      tickets.map((t) => t._id).indexOf(ticket._id) + 1
    );
    navigate(`/ticket/detail`);
  };

  const handleNew = () => {
    navigate(`/new`);
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (query) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handleResultsPerPage = (resultsPerPage) => {
    // update number of items per page
    if (typeof resultsPerPage == 'string') resultsPerPage = Infinity;

    setCurrentPage(1);
    setPageSize(resultsPerPage);
  };

  const handleOverview = () => {
    navigate('/ticket/overview');
  };

  const handleDetailPageChange = (page) => {
    setCurrentDetailPage(page);
    setTicket(tickets[page - 1]);
  };

  const handleSave = async (updates) => {
    console.log('udates', updates);
    // copy new value into existing values
    const ticketCopy = Object.assign(ticket, updates);
    console.log(ticketCopy);
    ticketCopy.date = Date.now();

    // updated ticket has not been read by the student
    ticketCopy.readStudent = false;
    ticketCopy.readProfessor = true;

    // ticketCopy.history.push(historyEntry());
    // setTicket(ticketCopy);

    await toast
      .promise(updateTicket(ticketCopy), {
        pending: 'Please wait...',
        success: 'Changes has been saved.',
        error: {
          render({ data: error }) {
            return error.response.data;
          },
        },
      })
      .then(() => {});
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

  // console.log(currentDetailPage);
  // useEffect(() => {
  //   const updateReadStatus = async () => {
  //     const ticketCopy = { ...ticket };

  //     if (user.role === 'student') ticketCopy.readStudent = true;
  //     else if (user.role === 'professor')
  //       ticketCopy.readProfessor = true;

  //     try {
  //       await updateTicket(ticketCopy);
  //     } catch (error) {
  //       toast.error('An error occured.');
  //     }
  //   };
  //   if (!ticket.title) window.location = '/ticket/overview';
  //   else updateReadStatus();
  // }, [ticket]);
  // Rendering
  return (
    <>
      <Routes>
        <Route
          path="/overview"
          element={
            <TicketOverview
              user={user}
              onNew={handleNew}
              onPageChange={handlePageChange}
              onSearch={handleSearch}
              onSort={handleSort}
              onClick={handleView}
              onResultsPerPage={handleResultsPerPage}
              currentPage={currentPage}
              pageSize={pageSize}
              searchQuery={searchQuery}
              sortColumn={sortColumn}
              tickets={pagedTicketsOnly}
              totalCount={totalCount}
            />
          }
        />

        <Route
          path="/detail"
          element={
            <TicketDetail
              user={user}
              ticket={ticket}
              totalCount={totalCount}
              onOverview={handleOverview}
              onPageChange={handleDetailPageChange}
              currentDetailPage={currentDetailPage}
              onSave={debouncedHandleSave}
              setTicket={setTicket}
            />
          }
        />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
};

export default Ticket;
