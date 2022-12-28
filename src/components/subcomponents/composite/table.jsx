import React from 'react';
import TableBody from '../atomic/tableBody';
import TableHeader from '../atomic/tableHeader.jsx';
import '../../../css/ticketTable.css';

const Table = ({
  propertyList,
  records,
  sortColumn,
  onSort,
  onClick,
}) => {
  return (
    <table className="ticketTable">
      <TableHeader
        propertyList={propertyList}
        onSort={onSort}
        sortColumn={sortColumn}
      />
      <TableBody
        propertyList={propertyList}
        records={records}
        onClick={onClick}
      />
    </table>
  );
};

export default Table;
