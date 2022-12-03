import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TicketOverview from './ticketOverview';
import TicketDetail from './ticketDetail';
import config from '../../config/config';
import { paginate } from '../services/paginate';
import { getTickets, updateTicket } from '../services/ticketService';

const Ticket = () => {
  // config.ticket required to avoid uncontrolled component errors
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(30);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState(config.sortColumn);
  const [tickets, setTickets] = useState([config.ticket]);
  const [ticket, setTicket] = useState([config.ticket]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getPagedData = async () => {
      const { data: tickets } = await getTickets();
      let filtered = tickets;
      if (searchQuery)
        filtered = tickets.filter(
          (m) =>
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
            m.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const sorted = _.orderBy(
        filtered,
        [sortColumn.column],
        [sortColumn.order]
      );
      const tickets_paginated = paginate(
        sorted,
        currentPage,
        pageSize
      );
      setTotalCount(sorted.length);
      setTickets(tickets_paginated);
    };
    getPagedData();
  }, [currentPage, pageSize, sortColumn, searchQuery]);

  const handleView = (ticket) => {
    setTicket(ticket);
    navigate(`/ticket/detail`);
  };

  const handleSave = async (updates) => {
    // copy new value into existing values
    const ticketCopy = Object.assign(ticket, updates);
    // stores states
    setTicket(ticketCopy);
    // ticket gets updated if validation passes
    updateTicket(ticket);
    navigate('/ticket/overview');
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

  return (
    <div>
      <Routes>
        <Route
          path="/overview"
          element={
            <TicketOverview
              data={'data'}
              searchQuery={searchQuery}
              onSearch={handleSearch}
              tickets={tickets}
              sortColumn={sortColumn}
              onSort={handleSort}
              onNew={handleNew}
              onView={handleView}
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          }
        />

        <Route
          path="/detail"
          element={
            <TicketDetail ticket={ticket} onSave={handleSave} />
          }
        />
      </Routes>
    </div>
  );
};

export default Ticket;
