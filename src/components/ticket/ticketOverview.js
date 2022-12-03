import Pagination from '../subcomponents/pagination';
import React from 'react';
import SearchBox from '../subcomponents/searchBox';
import TicketTable from '../subcomponents/ticketTable';

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
