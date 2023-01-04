import Pagination from '../subcomponents/composite/Pagination';
import React from 'react';
import SearchBox from '../subcomponents/atomic/SearchBox';
import TicketTable from '../subcomponents/composite/TicketTable';
import DropDown from '../subcomponents/atomic/DropDown';
import '../../css/ticketOverview.css';
import Button from '../subcomponents/atomic/Button';

const TicketOverview = ({
  user,
  onNew,
  onPageChange,
  onSearch,
  onSort,
  onClick,
  currentPage,
  pageSize,
  searchQuery,
  sortColumn,
  tickets,
  totalCount,
  onResultsPerPage,
}) => {
  return (
    <div className="ticketoverview">
      <div className="ticketoverview__pagination">
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
      {user.role === 'student' ? (
        <div className="ticketoverview__create">
          <Button label="Create Ticket" onClick={onNew} />
        </div>
      ) : null}
      <div className="ticketoverview__search">
        <SearchBox value={searchQuery} onChange={onSearch} />
      </div>
      <div className="ticketoverview__results-per-page">
        <DropDown
          label={'Results per page'}
          onClick={onResultsPerPage}
          options={[4, 8, 12, 16, 'All']}
        />
      </div>
      <div className="ticketoverview__table">
        {tickets.length === 0 ? (
          <p className="ticketoverview--no-tickets">
            Currently no tickets available.
          </p>
        ) : (
          <TicketTable
            user={user}
            tickets={tickets}
            sortColumn={sortColumn}
            onSort={onSort}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};

export default TicketOverview;
