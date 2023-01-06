import React from 'react';
import TableBody from '../atomic/TableBody';
import TableHeader from '../atomic/TableHeader';
import '../../../css/table.css';

const Table = ({
  propertyList,
  records,
  sortColumn,
  onSort,
  onClick,
}) => {
  return (
    <table className="table">
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