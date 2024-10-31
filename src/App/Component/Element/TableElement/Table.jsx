/**
 * @filename        : Table.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 23-10-2024, 21:44:57
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering a dynamic table with customizable headers and data.
 *                    It supports row and cell click events and allows custom rendering of table cells.
 */

import React, { useEffect } from 'react';
import { Pagination } from '../Widget/Pagination';

/**
 * @function Table - A function component for rendering a dynamic table with search functionality and page size selection.
 * 
 * @param {object} props - The props object.
 * @param {string} [props.className] - The class name of the table element.
 * @param {object} [props.head] - An object with key-value pairs for the table head.
 * @param {array} [props.data] - An array of objects with key-value pairs for the table body.
 * @param {array} [props.footer] - An array of objects with key-value pairs for the table footer.
 * @param {object} [props.options] - An object containing options for the table. It can include:
 *   - incrementText: The text for the increment column's header.
 *   - increment: A boolean to render a column with row numbers.
 *   - search: A boolean to enable search functionality across all data entries.
 *   - properties: An object containing the properties for the table, thead, tbody, tr, and td elements.
 *   - paginate: An object containing the properties for the pagination. It can include:
 *     - firstPage: A boolean to render a button for the first page.
 *     - previous: A boolean to render a button for the previous page.
 *     - next: A boolean to render a button for the next page.
 *     - lastPage: A boolean to render a button for the last page.
 *     - maxItems: The maximum number of items to display per page.
 *     - displayedButtons: The maximum number of buttons that will be displayed between the previous and next buttons.
 *     - properties: An object for setting custom styles or classes for pagination buttons and other elements.
 *     - text: An object containing the text for the buttons. It can include:
 *       - button: An object containing the text for the buttons. It can include:
 *         - firstPage: The text for the first page button.
 *         - previous: The text for the previous page button.
 *         - next: The text for the next page button.
 *         - lastPage: The text for the last page button.
 *   - pageSizeOptions: An array of numbers representing the page size options for the dropdown.
 * @param {function} [props.onRowClick] - A callback function that will be called when a table row is clicked.
 * @param {function} [props.onCellClick] - A callback function that will be called when a table cell is clicked.
 * @param {object} [props.cellProps] - An object with key-value pairs for the table cells.
 * @param {function} [props.customCell] - A callback function that will be called when a table cell is rendered. The function must return a React component.
 * @returns {JSX.Element} A JSX element representing the table component.
 * 
 * @example
    <Table
        className='table-class'
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
            search: {
                input: {
                    style: {
                        width: '100%',
                        padding: '5px',
                    },
                },
                label: 'Search By Name',
                wrapper: {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    },
                },
            }, // Enable search functionality
            increment: true,
            incrementText: 'Row #',
            paginate: {
                firstPage: true,
                previous: true,
                next: true,
                lastPage: true,
                maxItems: 10,
                displayedButtons: 5,
                text: {
                    button: {
                        firstPage: 'First Page',
                        previous: 'Previous',
                        next: 'Next',
                        lastPage: 'Last Page',
                    },
                },
                properties: {
                    wrapper: {
                        type: 'div',
                        props: {
                            style: {
                                display: 'flex',
                                justifyContent: 'center',
                            },
                        },
                    },
                    button: {
                        className: 'btn btn-primary',
                        style: {
                            margin: '0 5px',
                        },
                    },
                    ul: {
                        style: {
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                        },
                    },
                    li: {
                        style: {
                            margin: '0 5px',
                        },
                    },
                },
            },
            pageSizeOptions: [10, 25, 50],
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
export const Table = ({ className, head = {}, data = [], footer = [], options = {}, onRowClick, onCellClick, cellProps = {}, customCell, ...tableProps }) => {
    const [tableData, setTableData] = React.useState(data);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(0);
    const [maxItems, setMaxItems] = React.useState(options.paginate?.maxItems || 10);

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

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(0);
        setFilteredData(tableData.filter(row => {
            return Object.values(row).some(value => 
                String(value).toLowerCase().includes(event.target.value.toLowerCase())
            );
        }));
    };

    const handlePageSizeChange = (event) => {
        const newMaxItems = Number(event.target.value);
        setMaxItems(newMaxItems);
        setCurrentPage(0);
        setFilteredData(tableData.filter(row => {
            return Object.values(row).some(value => 
                String(value).toLowerCase().includes(searchQuery.toLowerCase())
            );
        }));
    };

    const [filteredData, setFilteredData] = React.useState(tableData);

    const { displayedButtons = 5, firstPage, previous, next, lastPage, text = {}, properties: paginationProperties = {}, listDataInfo = { type: 'span', position: 'left', props: { style: { display: 'block', textAlign: 'center', marginTop: '10px' } } } } = options.paginate || {};

    const { input = {}, label = 'Search', wrapper = {} } = options.search || {};

    const tableDataToDisplay = options.paginate ? filteredData.slice(currentPage * maxItems, (currentPage + 1) * maxItems) : filteredData;

    return (
        <React.Fragment>
            {options.search && (
                <div {...wrapper}>
                    <label htmlFor="search-input">{label}</label>
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        {...input}
                    />
                </div>
            )}
            {options.paginate && (
                <div style={{ marginBottom: '10px' }}>
                    Show 
                    <select onChange={handlePageSizeChange} value={maxItems}>
                        {options.pageSizeOptions.map(size => (
                            <option key={size} value={size}>{size} rows</option>
                        ))}
                    </select> 
                    entries
                </div>
            )}
            <table className={className} {...options.properties ? options.properties.table : {}} {...tableProps}>
                <thead {...options.properties ? options.properties.thead.props : {}}>
                    <tr {...options.properties ? options.properties.thead.tr : {}}>
                        {options.increment && <th {...options.properties ? options.properties.thead.td : {}}>{options.incrementText || '#'}</th>}
                        {Object.keys(head).map((key) => (
                            <th key={key} {...options.properties ? options.properties.thead.td : {}}>{head[key]}</th>
                        ))}
                    </tr>
                </thead>
                <tbody {...options.properties ? options.properties.tbody.props : {}}>
                    {tableDataToDisplay.map((row, index) => {
                        return (
                            <tr key={index} onClick={(event) => handleRowClick(event, row)} {...options.properties ? options.properties.tbody.tr : {}}>
                                {options.increment && <td {...options.properties ? options.properties.tbody.td : {}} {...cellProps}>{index + 1}</td>}
                                {Object.keys(head).map((key) => {
                                    return (
                                        <td key={key} onClick={(event) => handleCellClick(event, row, row[key])} {...options.properties ? options.properties.tbody.td : {}} {...cellProps}>
                                            {customCell ? customCell(row, key) : row[key]}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
                {footer.length > 0 && (
                    <tfoot {...options.properties ? options.properties.tfooter.props : {}}>
                        <tr {...options.properties ? options.properties.tfooter.tr : {}}>
                            {Object.keys(head).map((key) => {
                                return (
                                    <td key={key} {...options.properties ? options.properties.tfooter.td : {}}>
                                        {footer[0][key]}
                                    </td>
                                );
                            })}
                        </tr>
                    </tfoot>
                )}
            </table>
            {options.paginate && (
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    maxItems={filteredData.length}
                    displayedButtons={displayedButtons}
                    firstPage={firstPage}
                    previous={previous}
                    next={next}
                    lastPage={lastPage}
                    text={text}
                    properties={paginationProperties}
                    listDataInfo={listDataInfo}
                    maxItemsPerPage={maxItems}
                />
            )}
        </React.Fragment>
    );
}