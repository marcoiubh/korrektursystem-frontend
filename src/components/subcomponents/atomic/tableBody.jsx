import _ from 'lodash';
import React from 'react';

const TableBody = ({ records, propertyList }) => {
  // conditional statement to render buttons
  // column.content is a function that returns a component
  const renderCell = (record, property) => {
    if (property.content) return property.content(record);
    // lodash get method returns single records column by column
    return _.get(record, property.name);
  };

  return (
    <tbody className="table-group-divider">
      {records.map((record, index) => (
        <tr key={index}>
          {propertyList.map((property, index) => (
            <td key={index}>{renderCell(record, property)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
