import React from 'react';
import Table from './table';
import getPropertyList from '../../../config/propertyList';

const TicketTable = ({ onSort, onView, sortColumn, tickets }) => {
  const propertyList = getPropertyList({ onView });

  return (
    <>
      {tickets.length === 0 ? (
        <p>Currently no tickets available.</p>
      ) : (
        <Table
          propertyList={propertyList}
          records={tickets}
          onSort={onSort}
          sortColumn={sortColumn}
        />
      )}
    </>
  );
};

export default TicketTable;
