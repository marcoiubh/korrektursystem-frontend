import React from 'react';
import Table from './table';
import getPropertyList from '../../../config/propertyList';

const TicketTable = ({ onSort, onView, sortColumn, tickets }) => {
  const propertyList = getPropertyList({ onView });

  return (
    <>
      {tickets.length === 0 ? (
        <p>No ticket found in the system.</p>
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
