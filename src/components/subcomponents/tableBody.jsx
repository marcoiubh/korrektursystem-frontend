import _ from 'lodash';
import React from 'react';

const TableBody = ({ data, columns, idProperty }) => {
  // to render likes and buttons, we need a conditional statement
  // column.content is a function that returns a component
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.data);
  };

  const createKey = (item, column, idProperty) => {
    return item[idProperty] + column.key;
  };

  return (
    <tbody className="table-group-divider">
      {data.map((item) => (
        <tr key={item[idProperty]}>
          {columns.map((column) => (
            <td key={createKey(item, column, idProperty)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
