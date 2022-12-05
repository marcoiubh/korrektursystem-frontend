import { ifUserIsStudent } from '../../services/authenticationService';
import React from 'react';
import Table from './table';
import Button from '../atomic/button';
import getPropertyList from '../../../config/propertyList';

const TicketTable = ({
  onNew,
  onSort,
  onView,
  sortColumn,
  tickets,
}) => {
  const propertyList = getPropertyList({ onView });

  return (
    <div>
      <Button
        label="Create Ticket"
        onClick={onNew}
        hidden={!ifUserIsStudent()}
      />
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
    </div>
  );
};

export default TicketTable;
