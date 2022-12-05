import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TicketOverview from './ticketOverview';
import TicketDetail from './ticketDetail';
import config from '../../config/config';
import { paginate } from '../services/paginate';
import { getTickets } from '../services/ticketService';
import { search } from '../services/search';
import { sort } from '../services/sort';

const Ticket = () => {
  // config.ticket required to avoid uncontrolled component errors
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState(config.sortColumn);
  const [tickets, setTickets] = useState([config.ticket]);
  const [pagedTicketsOnly, setPagedTicketsOnly] = useState([
    config.ticket,
  ]);
  const [ticket, setTicket] = useState([config.ticket]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

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
  }, [currentPage, pageSize, sortColumn, searchQuery]);

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

  const handleOverview = () => {
    navigate('/ticket/overview');
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
              ticket={ticket}
              tickets={tickets}
              totalCount={totalCount}
              onOverview={handleOverview}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Ticket;
