import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TicketOverview from './ticketOverview';
import TicketDetail from './ticketDetail';
import config from '../../config/config';
import { paginate } from '../../services/paginate';
import { getTickets } from '../../services/ticketService';
import { search } from '../../services/search';
import { sort } from '../../services/sort';
import useRefresh from '../../services/useRefresh';
import Home from '../home';
import { toast } from 'react-toastify';
import { quitSession } from '../../services/authenticationService';
import { markNewTickets } from '../../services/markNewTickets';

const Ticket = ({ user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState(config.sortColumn);
  const [tickets, setTickets] = useState([{ mark: false }]);
  const [pagedTicketsOnly, setPagedTicketsOnly] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  // auto refresh
  const [time] = useRefresh();

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
        if (error) toast.error(error.message, { autoClose: 1000 });
        if (error.response.status === 401) quitSession();
      }
    };

    prepareTickets();
  }, [time, currentPage, pageSize, sortColumn, searchQuery, ticket]);

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

  const handleItemCountChange = (numberOfItems) => {
    // update number of items per page
    setCurrentPage(1);
    setPageSize(numberOfItems);
  };

  // Rendering
  return (
    <>
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
              onItemCountChange={handleItemCountChange}
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
              user={user.email}
              ticket={ticket}
              tickets={tickets}
              totalCount={totalCount}
              onTicketSeen={handleTicketSeen}
            />
          }
        />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
};

export default Ticket;
