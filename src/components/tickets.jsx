import _ from 'lodash';
import { getTickets } from './services/ticketService';
import { paginate } from './subcomponents/paginate';
import { useNavigate } from 'react-router-dom';
import config from '../config/config.json';
import Pagination from './subcomponents/pagination';
import React, { useState, useEffect } from 'react';
import SearchBox from './subcomponents/searchBox';
import TicketTable from './subcomponents/ticketTable';

const Tickets = () => {
  // config.ticket required to avoid uncontrolled component errors
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState(config.sortColumn);
  const [tickets, setTickets] = useState([config.ticket]);
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

  const handleEdit = (ticket) => {
    navigate(`/tickets/${ticket._id}`);
  };

  const handleView = (ticket) => {
    navigate(`/status/${ticket._id}`);
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
      <h1>Tickets</h1>
      <SearchBox value={searchQuery} onChange={handleSearch} />
      <TicketTable
        tickets={tickets}
        sortColumn={sortColumn}
        onEdit={handleEdit}
        onSort={handleSort}
        onNew={handleNew}
        onView={handleView}
      />
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Tickets;
