import Pagination from '../subcomponents/composite/pagination';
import React from 'react';
import SearchBox from '../subcomponents/atomic/searchBox';
import TicketTable from '../subcomponents/composite/ticketTable';
import DropDown from '../subcomponents/atomic/dropdown';
import { ifUserIsStudent } from '../../services/authenticationService';

import Button from '../subcomponents/atomic/button';

import '../../css/ticketOverview.css';

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
    <div className=" app_ticketOverview">
      <div className="app_items">
        <DropDown
          label={'Results per page'}
          onClick={onItemCountChange}
        />
      </div>
      <div className="app_pagination">
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
      <div className="app_search">
        <SearchBox value={searchQuery} onChange={onSearch} />
      </div>
      <div className="app_create">
        <Button
          label="Create Ticket"
          onClick={onNew}
          hidden={!ifUserIsStudent()}
        />
      </div>
      <div className="app_table">
        <TicketTable
          tickets={tickets}
          sortColumn={sortColumn}
          onSort={onSort}
          onView={onView}
        />
      </div>
    </div>
  );
};

export default TicketOverview;
