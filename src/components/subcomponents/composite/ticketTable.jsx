import React from 'react';
import Table from './table';
import config from '../../../config/config.json';

const TicketTable = ({
  user,
  onSort,
  onClick,
  sortColumn,
  tickets,
}) => {
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
