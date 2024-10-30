/**
 * @filename        : Table.js
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 23-10-2024, 21:44:57
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering a dynamic table with customizable headers and data.
 *                    It supports row and cell click events and allows custom rendering of table cells.
 */

import React, { useEffect } from 'react';

/**
 * @function Table
 * 
 * @description A function component for rendering a dynamic table.
 * @param {object} props - The props object.
 * @param {string} [props.className] - The class name of the table element.
 * @param {object} [props.head] - An object with key-value pairs for the table head.
 * @param {array} [props.data] - An array of objects with key-value pairs for the table body.
 * @param {array} [props.footer] - An array of objects with key-value pairs for the table footer.
 * @param {object} [props.options] - An object containing options for the table. It can include:
 *   - incrementText: The text for the increment column's header.
 *   - increment: A boolean to render a column with row numbers.
 *   - properties: An object containing the properties for the table, thead, tbody, tr, and td elements.
 *   - paginate: An object containing the properties for the pagination. It can include:
 *     - firstPage: A boolean to render a button for the first page.
 *     - previous: A boolean to render a button for the previous page.
 *     - next: A boolean to render a button for the next page.
 *     - lastPage: A boolean to render a button for the last page.
 *     - maxItems: The maximum number of items to display per page.
 *     - displayedButtons: The maximum number of buttons that will be displayed between the previous and next buttons.
 * @param {function} [props.onRowClick] - A callback function that will be called when a table row is clicked.
 * @param {function} [props.onCellClick] - A callback function that will be called when a table cell is clicked.
 * @param {object} [props.cellProps] - An object with key-value pairs for the table cells.
 * @param {function} [props.customCell] - A callback function that will be called when a table cell is rendered. The function must return a React component.
 * @example
    <Table
        head={{
            name: 'Name',
            age: 'Age',
            address: 'Address'
        }}
        data={[
            { name: 'John Doe', age: 25, address: '123 Main St' },
            { name: 'Jane Doe', age: 30, address: '456 Elm St' },
            { name: 'Bob Doe', age: 35, address: '789 Oak St' },
        ]}
        footer={[
            { name: 'Total', age: 0, address: '' },
        ]}
        onRowClick={(event, row) => console.log('row clicked', row)}
        onCellClick={(event, row, cell) => console.log('cell clicked', row, cell)}
        cellProps={{
            style: {
                padding: '10px',
                border: '1px solid #ccc'
            }
        }}
        customCell={(row, cellKey) => {
            const cellValue = row[cellKey];
            return (
                <a href="#" style={{ color: 'blue' }}>
                {cellValue}
                </a>
            );
        }}
        options={{
            increment: true,
            incrementText: 'Row #',
            paginate: {
                firstPage: true,
                previous: true,
                next: true,
                lastPage: true,
                maxItems: 5,
                displayedButtons: 5,
            },
            properties: {
                thead: {
                    props: {
                        className: 'thead-class',
                        style: { backgroundColor: '#f0f0f0' },
                    },
                    tr: {
                        className: 'thead-row-class',
                        style: {},
                    },
                    td: {
                        className: 'thead-column-class',
                        style: {},
                    }
                },
                tbody: {
                    props: {
                        className: 'tbody-props-class',
                        style: {},
                    },
                    tr: {
                        className: 'tbody-row-class',
                        style: {},
                    },
                    td: {
                        className: 'tbody-column-class',
                        style: {},
                    }
                },
                tfooter: {
                    props: {
                        className: 'tfooter-props-class',
                        style: {},
                    },
                    tr: {
                        className: 'tfooter-row-class',
                        style: {},
                    },
                    td: {
                        className: 'tfooter-column-class',
                        style: {},
                    }
                }
            }
        }}
    />
 */
export const Table = ({ className, head = {}, data = [], footer = [], options = {}, onRowClick, onCellClick, cellProps = {}, customCell }) => {
  const [tableData, setTableData] = React.useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleRowClick = (event, row) => {
    if (onRowClick) {
      onRowClick(event, row);
    }
  };

  const handleCellClick = (event, row, cell) => {
    if (onCellClick) {
      onCellClick(event, row, cell);
    }
  };

  const [currentPage, setCurrentPage] = React.useState(0);

  const { maxItems = 10, displayedButtons = 5, firstPage, previous, next, lastPage } = options.paginate || { maxItems: 10, displayedButtons: 5, firstPage: false, previous: false, next: false, lastPage: false };

  const handlePageChange = (event) => {
    const newPage = Number(event.target.value);
    setCurrentPage(newPage);
  };

  const tableDataToDisplay = tableData.slice(currentPage * maxItems, (currentPage + 1) * maxItems);

  const buttons = [];

  if (firstPage) {
    buttons.push(<button key="first" onClick={() => setCurrentPage(0)}>First</button>);
  }

  if (previous) {
    buttons.push(<button key="prev" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>);
  }

  const start = Math.max(0, currentPage - displayedButtons + 1);
  const end = Math.min(Math.ceil(tableData.length / maxItems), currentPage + displayedButtons);

  for (let i = start; i < end; i++) {
    buttons.push(<button key={i} onClick={() => setCurrentPage(i)}>{i + 1}</button>);
  }

  if (next) {
    buttons.push(<button key="next" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>);
  }

  if (lastPage) {
    buttons.push(<button key="last" onClick={() => setCurrentPage(Math.ceil(tableData.length / maxItems) - 1)}>Last</button>);
  }

  return (
    <div>
      <table className={className} {...options.properties.table}>
        <thead {...options.properties.thead.props}>
          <tr {...options.properties.thead.tr}>
            {options.increment && <th {...options.properties.thead.td}>{options.incrementText || '#'}</th>}
            {Object.keys(head).map((key) => (
              <th key={key} {...options.properties.thead.td}>{head[key]}</th>
            ))}
          </tr>
        </thead>
        <tbody {...options.properties.tbody.props}>
          {tableDataToDisplay.map((row, index) => {
            return (
              <tr key={index} onClick={(event) => handleRowClick(event, row)} {...options.properties.tbody.tr}>
                {options.increment && <td {...options.properties.tbody.td}>{index + 1}</td>}
                {Object.keys(head).map((key) => {
                  return (
                    <td key={key} onClick={(event) => handleCellClick(event, row, row[key])} {...cellProps} {...options.properties.tbody.td}>
                      {customCell ? customCell(row, key) : row[key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {footer.length > 0 && (
          <tfoot {...options.properties.tfooter.props}>
            <tr {...options.properties.tfooter.tr}>
              {Object.keys(head).map((key) => {
                return (
                  <td key={key} {...options.properties.tfooter.td}>
                    {footer[0][key]}
                  </td>
                );
              })}
            </tr>
          </tfoot>
        )}
      </table>
      <div style={{ marginTop: '10px' }}>
        {buttons}
      </div>
    </div>
  );
}


