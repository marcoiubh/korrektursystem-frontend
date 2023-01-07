import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import config from '../../config/config';
import { quitSession } from '../../services/authenticationService';
import { markNewTickets } from '../../services/markNewTickets';
import { paginate } from '../../services/paginate';
import { search } from '../../services/search';
import { sort } from '../../services/sort';
import { getTickets } from '../../services/ticketService';
import TicketDetail from './TicketDetail';
import TicketOverview from './TicketOverview';

const Ticket = ({ user, time }) => {
  const [currentPage, setCurrentPage] = useState(1);
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
      // fetch tickets from database
      const fetchedTickets = await fetchTickets();

      // filter tickets based on search query
      const filteredTickets = search(fetchedTickets, searchQuery);
      // set total count of search results
      setTotalCount(filteredTickets.length);

      // sort tickets based on sort column
      const sortedTickets = sort(filteredTickets, sortColumn);

      // mark new tickets
      const markedTickets = markNewTickets(sortedTickets, user);

      // set tickets for detail view
      setTickets(markedTickets);

      // paginate tickets for ticket overview
      const paginatedTickets = paginate(markedTickets, currentPage, pageSize);
      setPagedTicketsOnly(paginatedTickets);
    };

    const fetchTickets = async () => {
      try {
        // fetch tickets from database
        const { data } = await getTickets();
        return data;
      } catch (error) {
        if (error) toast.error(error.message);
        // on authorization error quit session
        if (error.response.status === 401) quitSession();
      }
    };

    prepareTickets();
  }, [time, user, currentPage, pageSize, sortColumn, searchQuery, ticket]);

  // row click
  const handleView = (ticket) => {
    // select ticket and head to detail view
    setTicket(ticket);
    navigate(`/ticket/detail`);
  };

  // create ticket button
  const handleNew = () => {
    navigate(`/new`);
  };

  // column sort
  const handleSort = (property) => {
    // shallow copy of sortColumn object
    const newSortColumn = { ...sortColumn };
    // if the same column was pressed, change orientation
    if (newSortColumn.property === property)
      newSortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    // change sortColumn otherwise
    else {
      newSortColumn.property = property;
      newSortColumn.order = 'asc';
    }
    setSortColumn(newSortColumn);
  };

  // page button overview
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // search bar
  const handleSearch = (query) => {
    // set search query and go back to page one
    setCurrentPage(1);
    setSearchQuery(query);
  };

  // dropdown
  const handleResultsPerPage = (resultsPerPage) => {
    // convert 'all' to infinity
    if (typeof resultsPerPage == 'string') resultsPerPage = Infinity;
    // set new page size and go back to page one
    setCurrentPage(1);
    setPageSize(resultsPerPage);
  };

  return (
    <>
      <Routes>
        {/* overview */}
        <Route
          path='/overview'
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

        {/* details */}
        <Route
          path='/detail'
          element={
            <TicketDetail
              user={user}
              ticket={ticket}
              tickets={tickets}
              totalCount={totalCount}
            />
          }
        />

        {/* arbitrary urls */}
        <Route
          path='/*'
          element={<Navigate to='/ticket/overview' />}
        />
      </Routes>
    </>
  );
};

export default Ticket;
