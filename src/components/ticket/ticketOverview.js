import Pagination from '../subcomponents/composite/pagination';
import React from 'react';
import SearchBox from '../subcomponents/atomic/searchBox';
import TicketTable from '../subcomponents/composite/ticketTable';
import DropDown from '../subcomponents/atomic/dropdown';

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
  onItemCountChange,
}) => {
  return (
    <div>
      <div className="grid-container">
        <div>
          <DropDown label={'items'} onClick={onItemCountChange} />
        </div>
        <div>
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
        <div>
          <SearchBox value={searchQuery} onChange={onSearch} />
        </div>
      </div>
      <TicketTable
        tickets={tickets}
        sortColumn={sortColumn}
        onSort={onSort}
        onNew={onNew}
        onView={onView}
      />
    </div>
  );
};

export default TicketOverview;
