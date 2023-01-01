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
  let propertyList = [];
  if (user.role === 'student')
    propertyList = config.table_properties.student;
  else propertyList = config.table_properties.professor;

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
