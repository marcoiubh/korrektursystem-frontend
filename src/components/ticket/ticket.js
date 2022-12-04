import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TicketOverview from './ticketOverview';
import TicketDetail from './ticketDetail';
import config from '../../config/config';
import { paginate } from '../services/paginate';
import { getTickets } from '../services/ticketService';

const Ticket = () => {
  // config.ticket required to avoid uncontrolled component errors
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState(config.sortColumn);
  const [allTickets, setAllTickets] = useState([config.ticket]);
  const [pagedTickets, setPagedTickets] = useState([config.ticket]);
  const [ticket, setTicket] = useState([config.ticket]);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const prepareTickets = async () => {
      let ticketSelection = await fetchTickets();
      ticketSelection = filterSelection(ticketSelection);
      setTotalCount(ticketSelection.length);
      ticketSelection = sortSelection(ticketSelection);
      setAllTickets(ticketSelection);
      ticketSelection = pageSelection(ticketSelection);
      setPagedTickets(ticketSelection);
    };
    const fetchTickets = async () => {
      const { data } = await getTickets();
      return data;
    };
    const filterSelection = (ticketSelection) => {
      if (searchQuery)
        return ticketSelection.filter((m) => {
          return (
            m.date.startsWith(searchQuery) ||
            m.module
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            m.source
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            m.status
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            m.student
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            m.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            m.type
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            m.priority
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        });
      return ticketSelection;
    };
    const sortSelection = (ticketSelection) => {
      return _.orderBy(
        ticketSelection,
        [sortColumn.column],
        [sortColumn.order]
      );
    };
    const pageSelection = (ticketSelection) => {
      return paginate(ticketSelection, currentPage, pageSize);
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
              tickets={pagedTickets}
              totalCount={totalCount}
            />
          }
        />

        <Route
          path="/detail"
          element={
            <TicketDetail
              ticket={ticket}
              tickets={allTickets}
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
