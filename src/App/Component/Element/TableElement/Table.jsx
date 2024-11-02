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

import { useState, useEffect } from 'react';
import { copyToClipboard, exportToCsv, exportToExcel, generatePdf } from '../../Helper/ConstantMotion';
import { TableHeader } from '../Widget/TableHeader';
import { Pagination } from '../Widget/Pagination';

/**
 * @function Table
 * 
 * @description
 *      A React function component for rendering a dynamic table. It provides functionalities like pagination, searching, 
 *      custom actions, and exporting data.
 * 
 * @param {object} props - The props object.
 *      - className: {string} The class name for the table wrapper.
 *      - head: {object} An object representing table headers, where keys are column keys and values are column names.
 *      - data: {array} An array of objects representing the table data.
 *      - footer: {array} An array of objects representing footer data for the table.
 *      - options: {object} A configuration object for customizing the table's features:
 *          - paginate: {object} Configuration for pagination.
 *              - maxItems: {number} The maximum number of items per page.
 *              - displayedButtons: {number} The number of pagination buttons to display.
 *              - firstPage: {boolean} Whether to show the 'First Page' button.
 *              - previous: {boolean} Whether to show the 'Previous' button.
 *              - next: {boolean} Whether to show the 'Next' button.
 *              - lastPage: {boolean} Whether to show the 'Last Page' button.
 *              - text: {object} Text configuration for pagination buttons.
 *              - properties: {object} Styling properties for pagination elements.
 *              - listDataInfo: {object} Configuration for the list data info tag.
 *          - pageSizeOptions: {array} Options for page size selection.
 *          - pageSizeProps: {object} Styling properties for the page size select element.
 *          - search: {object} Configuration for the search functionality.
 *              - input: {object} Input properties for the search bar.
 *              - label: {string} Label text for the search bar.
 *              - wrapper: {object} Wrapper properties for the search bar.
 *          - actionButtons: {array} An array of action buttons with properties like id, onClick, className, and text.
 *          - increment: {boolean} Whether to show an increment column.
 *          - incrementText: {string} The header text for the increment column.
 *          - properties: {object} Styling properties for table elements.
 *              - table: {object} Table properties.
 *              - thead: {object} Thead properties.
 *              - tbody: {object} Tbody properties.
 *              - tfooter: {object} Tfooter properties.
 *      - onRowClick: {function} Callback function to be called when a table row is clicked.
 *      - onCellClick: {function} Callback function to be called when a table cell is clicked.
 *      - cellProps: {object} Properties for each table cell.
 *      - customCell: {function} Customization function for rendering table cells.
 *      - tableProps: {object} Additional properties for the table element.
 * 
 * @returns {ReactElement} A React element representing the table.
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
                label: {
                    text: 'Cari ',
                    className: 'input-label',
                },
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
    const [tableData,   setTableData]   = useState(data);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [maxItems,    setMaxItems]    = useState(options.paginate?.maxItems || 10);

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

    const [sortKey,     setSortKey]     = useState(null);
    const [isAscending, setIsAscending] = useState(null);

    const handleSort = (key) => {
        let sortedData;
        if (key === sortKey) {
            sortedData = filteredData.reverse();
            setIsAscending(!isAscending);
        } else {
            sortedData = [...filteredData].sort((a, b) => {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            });
            setSortKey(key);
            setIsAscending(true);
        }
        setFilteredData(sortedData);
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
            fileName ? fileName : `${fileNamePdf}.pdf`,
            {
                0: { halign: 'center', cellWidth: 40 },
                1: { halign: 'center', cellWidth: 50 }
            }
        );
    };

    const fileNameExcel = 'Exported Data Excel';
    const handleExportToExcel = (fileName) => {
        exportToExcel(tableData, fileName ? fileName : `${fileNameExcel}.xlsx`, `${fileNameExcel} Sheet`);
    };

    const fileNameCsv = 'Exported Data CSV';
    const handleExportToCsv = (fileName) => {
        exportToCsv(tableData, fileName ? fileName : `${fileNameCsv}.csv`, {
            0: { halign: 'center', cellWidth: 40 },
            1: { halign: 'center', cellWidth: 50 }
        });
    };

    const thClassName = options.properties?.thead?.td?.className || "border bg-violet-100 text-gray-600 hover:cursor-pointer";
    const thProps     = options.properties ? options.properties.thead.td : {};

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
            <img src="https://play.tailwindcss.com/img/beams.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
            <div className="w-full relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg sm:px-10" style={{ margin: '10px', width: '98%' }}>

                <TableHeader
                    options={options}
                    maxItems={maxItems}
                    handlePageSizeChange={handlePageSizeChange}
                    handlePrint={handlePrint}
                    handleCopy={handleCopy}
                    handleExportToPdf={handleExportToPdf}
                    handleExportToExcel={handleExportToExcel}
                    handleExportToCsv={handleExportToCsv}
                    fileNamePdf={fileNamePdf}
                    fileNameExcel={fileNameExcel}
                    fileNameCsv={fileNameCsv}
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    wrapper={wrapper}
                    input={input}
                />
                
                <main className="rounded-sm">
                    <table className="border-collapse table-auto w-full text-sm" {...options.properties ? options.properties.table : {}} {...tableProps}>
                        <thead {...options.properties ? options.properties.thead.props : {}}>
                            <tr {...options.properties ? options.properties.thead.tr : {}}>
                                {options.increment && <th className={options.properties?.thead?.td?.className || "border bg-violet-100 text-gray-600"} {...options.properties ? options.properties.thead.td : {}} {...cellProps}>{options.incrementText || '#'}</th>}
                                {Object.keys(head).map((key) => {
                                    return (
                                        <th key={key} className={thClassName} {...thProps} {...cellProps} onClick={() => handleSort(key)}>
                                            {head[key]}
                                            <span className="ml-2">
                                                {isAscending ? <>&#x25B4;</> : <>&#x25BE;</>}
                                            </span>
                                        </th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody {...options.properties ? options.properties.tbody.props : {}}>
                            {tableDataToDisplay.map((row, index) => {
                                const number = index + (currentPage) * displayedButtons;
                                return (
                                    <tr key={number} onClick={(event) => handleRowClick(event, row)} {...options.properties ? options.properties.tbody.tr : {}}>
                                        {options.increment && (
                                            <td {...(options.properties ? options.properties.tbody.td : {})} style={{ textAlign: 'center' }}>
                                                {number + 1}
                                            </td>
                                        )}
                                        {Object.keys(head).map((key) => {
                                            return (
                                                <td
                                                    key={key}
                                                    onClick={(event) => handleCellClick(event, row, row[key])}
                                                    {...options.properties ? options.properties.tbody.td : {}}
                                                    {...cellProps}
                                                >
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
                                            <td key={key} {...options.properties ? options.properties.tfooter.td : {}} {...cellProps}>
                                                {footer[0][key]}
                                            </td>
                                        );
                                    })}
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </main>

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

            </div>
        </div>
    );
}