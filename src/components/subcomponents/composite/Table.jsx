import React from 'react';

import '../../../css/table.css';

import TableBody from '../atomic/TableBody';
import TableHeader from '../atomic/TableHeader';

const Table = ({ propertyList, records, sortColumn, onSort, onClick }) => {
  return (
    <table className='table'>
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
