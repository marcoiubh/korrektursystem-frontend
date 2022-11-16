import React, { useState, useEffect } from 'react';
import TicketTable from './subcomponents/ticketTable';
import { getTickets } from './services/ticketService';
import { useNavigate } from 'react-router-dom';
import config from '../config/config.json';
import _ from 'lodash';
import { paginate } from './subcomponents/paginate';
import Pagination from './subcomponents/pagination';
import SearchBox from './subcomponents/searchBox';

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([config.ticket]);
  const [sortColumn, setSortColumn] = useState({
    column: 'title',
    order: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const getPagedData = async () => {
      const { data: tickets } = await getTickets();
      let filtered = tickets;
      if (searchQuery)
        filtered = tickets.filter((m) =>
          m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
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
