import React from 'react';
import '../../../css/table.css';
import { getFormattedDate } from '../../../services/getFormattedTimestamp';

const TableBody = ({ records, propertyList, onClick }) => {
  const renderCell = (record, property) => {
    if (property === 'date') return getFormattedDate(record.date);
    return record[property];
  };

  return (
    <tbody>
      {records.map((record, index) => (
        <tr
          className={`table__body ${
            record.mark ? 'table__row--mark' : 'table__row--no-mark'
          }`}
          key={index}
          onClick={() => onClick(record)}
        >
          {propertyList.map((property, index) => (
            <td className={property} key={index}>
              {renderCell(record, property)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
