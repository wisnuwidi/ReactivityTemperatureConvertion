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

import React, { useState, useEffect } from 'react';
import { Pagination } from '../Widget/Pagination';
import { Select } from '../FormElement/Select';
import { Input } from '../FormElement/Input';
import { Button } from '../FormElement/Button';
import { copyToClipboard, exportToCsv, exportToExcel, generatePdf } from '../../Helper/ConstantMotion';

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
 *   - actionButtons: An array of objects representing action buttons with dynamic props and text, except for onClick.
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
            },
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
            pageSizeProps: {
                className: 'custom-select-class',
                style: {
                    border: '1px solid #ccc',
                    padding: '5px',
                }
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
            },
            actionButtons: [
                {
                    id: 'btn-print',
                    onClick: handlePrint,
                    className: 'text-white bg-green-500 hover:bg-green-700',
                    text: 'Print',
                },
                {
                    id: 'btn-copy',
                    onClick: handleCopy,
                    className: 'text-white bg-green-500 hover:bg-green-700',
                    text: 'Copy'
                },
                {
                    id: 'btn-pdf',
                    onClick: handleExportToPdf,
                    className: 'text-white bg-blue-500 hover:bg-blue-700',
                    text: 'Export To PDF'
                    fileName: 'exportPDF'
                },
                {
                    id: 'btn-excel',
                    onClick: handleExportToExcel,
                    className: 'text-white bg-blue-500 hover:bg-blue-700',
                    text: 'Export To Excel'
                    fileName: 'exportExcel'
                },
                {
                    id: 'btn-csv',
                    onClick: handleExportToCsv,
                    className: 'text-white bg-blue-500 hover:bg-blue-700',
                    text: 'Export To CSV'
                    fileName: 'exportCSV'
                },
            ]
        }}
    />
 */
export const Table = ({ className, head = {}, data = [], footer = [], options = {}, onRowClick, onCellClick, cellProps = {}, customCell, ...tableProps }) => {
    const [tableData, setTableData] = useState(data);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [maxItems, setMaxItems] = useState(options.paginate?.maxItems || 10);

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

    const [filteredData, setFilteredData] = useState(tableData);

    const { displayedButtons = 5, firstPage, previous, next, lastPage, text = {}, properties: paginationProperties = {}, listDataInfo = { type: 'span', position: 'left', props: { style: { display: 'block', textAlign: 'center', marginTop: '10px' } } } } = options.paginate || {};

    const { input = {}, label = 'Search', wrapper = {} } = options.search || {};

    const tableDataToDisplay = options.paginate ? filteredData.slice(currentPage * maxItems, (currentPage + 1) * maxItems) : filteredData;

    const handleCopy = () => {
        copyToClipboard(data, 'Data copied to clipboard');
    };

    const handlePrint = () => {
        window.print();
    };

    const fileNamePdf = 'Exported Data PDF';
    const handleExportToPdf = (fileName) => {
        generatePdf(
            Object.keys(head),
            tableData,
            fileName? fileName : `${fileNamePdf}.pdf`,
            {
                0: { halign: 'center', cellWidth: 40 },
                1: { halign: 'center', cellWidth: 50 }
            }
        );
    };

    const fileNameExcel = 'Exported Data Excel';
    const handleExportToExcel = (fileName) => {
        exportToExcel(tableData, fileName? fileName : `${fileNameExcel}.xlsx`, 'CustomSheet');
    };

    const fileNameCsv = 'Exported Data CSV';
    const handleExportToCsv = (fileName) => {
        exportToCsv(tableData, fileName? fileName : `${fileNameCsv}.csv`, {
            0: { halign: 'center', cellWidth: 40 },
            1: { halign: 'center', cellWidth: 50 }
        });
    };

    return (
        <React.Fragment>
            <div className="w-full md:w-auto">
                <header className="flex justify-between">
                    <div className="w-1/5">
                        {options.paginate && (
                            <Select
                                data={[{
                                    className: `${options.pageSizeProps?.className || 'text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2 rounded-none focus:outline-none focus:ring-1 focus:ring-indigo-500'}`,
                                    id: 'row-data-table',
                                    options: options.pageSizeOptions.map(size => ({ value: size, label: `${size} rows` })),
                                    label: {
                                        left: { text: 'Show ', className: 'text-sm font-medium text-gray-700 p-2' },
                                        right: { text: ' Entries', className: 'text-sm font-medium text-gray-700 p-2' }
                                    },
                                    value: maxItems,
                                    ...(options.pageSizeProps || {})
                                }]}
                                value={maxItems}
                                onChange={handlePageSizeChange}
                                wrapper={{
                                    tag: "div",
                                    className: "w-full flex",
                                }}
                            />
                        )}
                    </div>
                    <div className="w-2/5">
                        <div className="flex justify-center">
                            {options.actionButtons ? (
                                <Button
                                    buttons={options.actionButtons.map(button => ({
                                        ...button,
                                        className: button.className || "text-white bg-green-500 hover:bg-green-700 text-sm px-4 py-3 leading-none border-transparent rounded-none",
                                        onClick: (() => {
                                            switch (button.id) {
                                                case 'btn-print':
                                                    return handlePrint;
                                                case 'btn-copy':
                                                    return handleCopy;
                                                case 'btn-pdf':
                                                    return handleExportToPdf.bind(null, (button.filename? button.filename : fileNamePdf));
                                                case 'btn-excel':
                                                    return handleExportToExcel.bind(null, (button.filename? button.filename : fileNameExcel));
                                                case 'btn-csv':
                                                    return handleExportToCsv.bind(null, (button.filename? button.filename : fileNameCsv));
                                                default:
                                                    return () => {};
                                            }
                                        })(),
                                    }))}
                                />
                            ) : (<>&nbsp;</>)}
                        </div>
                    </div>
                    <div className="w-1/5">
                        {options.search && (
                            <Input 
                                data={[{
                                    type: "text",
                                    id: "search-input",
                                    className: "border border-gray-500 rounded-md p-2 w-full",
                                    name: "search",
                                    value: searchQuery ? searchQuery : "",
                                    label: {
                                        left: {text: label,}
                                    },
                                    placeholder: "Search..."
                                }]}
                                onChange={handleSearchChange}
                                wrapper={wrapper}
                                {...input} 
                            />
                        )}
                    </div>
                </header>
                <table className="table-auto w-full" {...options.properties ? options.properties.table : {}} {...tableProps}>
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
                        currentPage      = {currentPage}
                        setCurrentPage   = {setCurrentPage}
                        maxItems         = {filteredData.length}
                        displayedButtons = {displayedButtons}
                        firstPage        = {firstPage}
                        previous         = {previous}
                        next             = {next}
                        lastPage         = {lastPage}
                        text             = {text}
                        properties       = {paginationProperties}
                        listDataInfo     = {listDataInfo}
                        maxItemsPerPage  = {maxItems}
                    />
                )}
            </div>
        </React.Fragment>
    );
}
