import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TicketOverview from './ticketOverview';
import TicketDetail from './ticketDetail';
import config from '../../config/config';
import { paginate } from '../services/paginate';
import { getTickets } from '../services/ticketService';
import { search } from '../services/search';
import { sort } from '../services/sort';
import { getJwt } from '../services/authenticationService';
import useRefresh from '../services/useRefresh';

const Ticket = ({ user, onDeleteUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState(config.sortColumn);
  const [tickets, setTickets] = useState([]);
  const [pagedTicketsOnly, setPagedTicketsOnly] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const [time] = useRefresh();

  useEffect(() => {
    const prepareTickets = async () => {
      const fetchedTickets = await fetchTickets();
      const filteredTickets = search(fetchedTickets, searchQuery);
      setTotalCount(filteredTickets.length);
      const sortedTickets = sort(filteredTickets, sortColumn);
      setTickets(sortedTickets);
      const paginatedTickets = paginate(
        sortedTickets,
        currentPage,
        pageSize
      );
      setPagedTicketsOnly(paginatedTickets);
    };

    const fetchTickets = async () => {
      const { data } = await getTickets();
      return data;
    };

    prepareTickets();
  }, [time, currentPage, pageSize, sortColumn, searchQuery, ticket]);

  useEffect(() => {
    // if token got deleted for any reason
    if (!getJwt()) {
      // delete current user
      onDeleteUser();
      // navigate user back to login
      window.location = '/login';
    }
  });

  // EventHandler
  const handleView = (ticket) => {
    setTicket(ticket);
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

  const handleTicketSeen = (ticketCopy) => {
    // update ticket state to rerender view label
    setTicket(ticketCopy);
  };

  // Rendering
  return (
    <div>
      <Routes>
        <Route
          path="/overview"
          element={
            <TicketOverview
              onNew={handleNew}
              onPageChange={handlePageChange}
              onSearch={handleSearch}
              onSort={handleSort}
              onView={handleView}
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
              tickets={tickets}
              totalCount={totalCount}
              onTicketSeen={handleTicketSeen}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Ticket;
