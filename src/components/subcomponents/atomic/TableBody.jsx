import React from 'react';
import '../../../css/table.css';
import { getFormattedDate } from '../../../services/getFormattedTimestamp';

const TableBody = ({ records, propertyList, onClick }) => {
  const renderCell = (record, property) => {
    // return date format
    if (property === 'date') return getFormattedDate(record.date);
    // return cell value
    return record[property];
  };

  return (
    <tbody>
      {/* rows */}
      {records.map((record, index) => (
        <tr
          className={`table__body ${
            record.mark ? 'table__row--mark' : 'table__row--no-mark'
          }`}
          key={index}
          onClick={() => onClick(record)}
        >
          {/* cells */}
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
