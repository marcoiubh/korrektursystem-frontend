import React from 'react';

import '../../css/ticketOverview.css';

import Button from '../subcomponents/atomic/Button';
import DropDown from '../subcomponents/atomic/DropDown';
import SearchBox from '../subcomponents/atomic/SearchBox';
import Pagination from '../subcomponents/composite/Pagination';
import TicketTable from '../subcomponents/composite/TicketTable';

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
    <div className='ticketoverview'>
      {/* pagination */}
      <div className='ticketoverview__pagination'>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>

      {/* create button - students only */}
      {user.role === 'student' ? (
        <div className='ticketoverview__create'>
          <Button
            label='Create Ticket'
            onClick={onNew}
          />
        </div>
      ) : null}

      {/* search bar */}
      <div className='ticketoverview__search'>
        <SearchBox
          value={searchQuery}
          onChange={onSearch}
        />
      </div>

      {/* dropdown */}
      <div className='ticketoverview__results-per-page'>
        <DropDown
          label={'Results per page'}
          onClick={onResultsPerPage}
          options={[4, 8, 12, 16, 'All']}
        />
      </div>

      {/* ticket table */}
      <div className='ticketoverview__table'>
        {tickets.length === 0 ? (
          <p className='ticketoverview--no-tickets'>
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
