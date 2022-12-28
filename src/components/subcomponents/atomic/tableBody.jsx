import _ from 'lodash';
import React from 'react';
import '../../../css/ticketTable.css';

const TableBody = ({ records, propertyList, onClick }) => {
  // conditional statement to render buttons
  // column.content is a function that returns a component
  const renderCell = (record, property) => {
    if (property.content) return property.content(record);
    // lodash get method returns single records column by column
    return _.get(record, property.name);
  };

  return (
    <tbody>
      {records.map((record, index) => (
        <tr
          className={`tableBody ${record.mark ? 'mark' : 'nomark'}`}
          key={index}
          onClick={() => onClick(record)}
        >
          {propertyList.map((property, index) => (
            <td className={property.name} key={index}>
              {renderCell(record, property)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
