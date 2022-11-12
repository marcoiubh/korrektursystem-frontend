import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableHeader.jsx';

const Table = ({ columns, data, sortColumn, onSort }) => {
  return (
    <table className="table table-default table-striped">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody columns={columns} data={data} idProperty="id" />
    </table>
  );
};

export default Table;
