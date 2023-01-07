import React from 'react';

import config from '../../../config/config.json';
import Table from './Table';

const TicketTable = ({ user, onSort, onClick, sortColumn, tickets }) => {
  // configuration file holds role dependent table schema
  const propertyList = config.table_properties[user.role];

  return (
    <Table
      propertyList={propertyList}
      records={tickets}
      onSort={onSort}
      sortColumn={sortColumn}
      onClick={onClick}
    />
  );
};

export default TicketTable;
