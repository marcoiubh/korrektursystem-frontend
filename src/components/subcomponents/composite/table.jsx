import React from 'react';
import TableBody from '../atomic/tableBody';
import TableHeader from '../atomic/tableHeader.jsx';

const Table = ({ propertyList, records, sortColumn, onSort }) => {
  return (
    <table className="table table-hover table-striped">
      <TableHeader
        propertyList={propertyList}
        onSort={onSort}
        sortColumn={sortColumn}
      />
      <TableBody propertyList={propertyList} records={records} />
    </table>
  );
};

export default Table;
