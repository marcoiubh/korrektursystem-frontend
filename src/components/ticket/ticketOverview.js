import Pagination from '../subcomponents/composite/pagination';
import React, { useEffect } from 'react';
import SearchBox from '../subcomponents/atomic/searchBox';
import TicketTable from '../subcomponents/composite/ticketTable';

const TicketOverview = ({
  onNew,
  onPageChange,
  onSearch,
  onSort,
  onView,
  currentPage,
  pageSize,
  searchQuery,
  sortColumn,
  tickets,
  totalCount,
}) => {
  return (
    <div>
      <SearchBox value={searchQuery} onChange={onSearch} />
      <TicketTable
        tickets={tickets}
        sortColumn={sortColumn}
        onSort={onSort}
        onNew={onNew}
        onView={onView}
      />
      <Pagination
        itemsCount={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TicketOverview;
