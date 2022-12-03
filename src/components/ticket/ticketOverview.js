import Pagination from '../subcomponents/pagination';
import React from 'react';
import SearchBox from '../subcomponents/searchBox';
import TicketTable from '../subcomponents/ticketTable';

const TicketOverview = ({
  searchQuery,
  onSearch,
  tickets,
  sortColumn,
  onSort,
  onNew,
  onView,
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
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
