/**
 * @filename        : TableHeader.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 02-11-2024, 22:25:30
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering a table header with pagination, search, and action buttons.
 */

import React from 'react';
import { Select } from '../FormElement/Select';
import { Input } from '../FormElement/Input';
import { Button } from '../FormElement/Button';

/**
 * @function TableHeader - A component for rendering a table header with pagination, search, and action buttons.
 * 
 * @param {object} props - The props object.
 *      - This object can contain the following properties:
 *          - options: An object containing configuration for the header.
 *              - paginate: A boolean indicating whether to show the pagination buttons.
 *              - pageSizeOptions: An array of numbers of items per page.
 *              - actionButtons: An array of objects containing the id, label, and className for each action button.
 *              - search: An object containing configuration for the search input.
 *                  - label: An object containing the text and className for the search label.
 *                  - input: An object containing the className and placeholder for the search input.
 *          - maxItems: The total number of items in the table.
 *          - handlePageSizeChange: The function that will be called when the user changes the page size.
 *          - handlePrint: The function that will be called when the user clicks the print button.
 *          - handleCopy: The function that will be called when the user clicks the copy button.
 *          - handleExportToPdf: The function that will be called when the user clicks the PDF button.
 *          - handleExportToExcel: The function that will be called when the user clicks the Excel button.
 *          - handleExportToCsv: The function that will be called when the user clicks the CSV button.
 *          - fileNamePdf: The default filename for PDF export.
 *          - fileNameExcel: The default filename for Excel export.
 *          - fileNameCsv: The default filename for CSV export.
 *          - searchQuery: The current search query.
 *          - handleSearchChange: The function that will be called when the user changes the search query.
 *          - wrapper: An object containing the tag and className for the wrapper element.
 *          - input: An object containing the className and placeholder for the search input.
 * @returns {ReactElement} A React element representing the table header.
 * 
 * @example
    <TableHeader
        options={{
            paginate: true,
            pageSizeOptions: [10, 25, 50],
            actionButtons: [
                { id: 'btn-print', label: 'Print' },
                { id: 'btn-copy', label: 'Copy' },
                { id: 'btn-pdf', label: 'PDF', filename: 'example.pdf' },
                { id: 'btn-excel', label: 'Excel', filename: 'example.xlsx' },
                { id: 'btn-csv', label: 'CSV', filename: 'example.csv' }
            ],
            search: {
                label: { text: 'Search' },
                input: { className: 'search-input' }
            }
        }}
        maxItems={10}
        handlePageSizeChange={(newSize) => { console.log(newSize); }}
        handlePrint={() => { console.log('Print'); }}
        handleCopy={() => { console.log('Copy'); }}
        handleExportToPdf={(name) => { console.log(name); }}
        handleExportToExcel={(name) => { console.log(name); }}
        handleExportToCsv={(name) => { console.log(name); }}
        fileNamePdf="example.pdf"
        fileNameExcel="example.xlsx"
        fileNameCsv="example.csv"
        searchQuery=""
        handleSearchChange={(search) => { console.log(search); }}
        wrapper={{
            tag: "div",
            className: "w-full flex justify-center"
        }}
        input={{
            className: "search-input",
            placeholder: "Search..."
        }}
    />
*/
export const TableHeader = ({ options, maxItems, handlePageSizeChange, handlePrint, handleCopy, handleExportToPdf, handleExportToExcel, handleExportToCsv, fileNamePdf, fileNameExcel, fileNameCsv, searchQuery, handleSearchChange, wrapper, input }) => {
    return (
        <header className="flex justify-between content-center">
            <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {options.paginate && (
                    <Select
                        data={[{
                            className : `${options.pageSizeProps?.className || 'text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2 rounded-none focus:outline-none focus:ring-1 focus:ring-indigo-500'}`,
                            id        : 'row-data-table',
                            value     : maxItems,
                            options   : options.pageSizeOptions.map(size => ({ value: size, label: `${size} rows` })),
                            label     : {
                                left  : { text: 'Show ',    className: 'text-sm font-medium text-gray-700 p-2' },
                                right : { text: ' Entries', className: 'text-sm font-medium text-gray-700 p-2' }
                            },
                            ...(options.pageSizeProps || {})
                        }]}
                        value    = {maxItems}
                        onChange = {handlePageSizeChange}
                        wrapper  = {{
                            tag       : "div",
                            className : "w-full flex",
                        }}
                    />
                )}
            </div>
            <div className="w-2/3">
                <div className="flex justify-center mx-8">
                    {options.actionButtons ? (
                        <Button
                            buttons={options.actionButtons.map(button => ({
                                ...button,
                                className: button.className || "text-white bg-slate-400 hover:bg-slate-700 text-sm px-4 py-3 leading-none border-transparent rounded-none",
                                onClick: (() => {
                                    switch (button.id) {
                                        case 'btn-print':
                                            return handlePrint;
                                        case 'btn-copy':
                                            return handleCopy;
                                        case 'btn-pdf':
                                            return handleExportToPdf.bind(null, (button.filename ? button.filename : fileNamePdf));
                                        case 'btn-excel':
                                            return handleExportToExcel.bind(null, (button.filename ? button.filename : fileNameExcel));
                                        case 'btn-csv':
                                            return handleExportToCsv.bind(null, (button.filename ? button.filename : fileNameCsv));
                                        default:
                                            return () => { };
                                    }
                                })(),
                            }))}
                        />
                    ) : (<>&nbsp;</>)}
                </div>
            </div>
            <div className="">
                {options.search && (
                    <Input
                        data={[{
                            type: "text",
                            id: "search-input",
                            className: `${options.search?.input?.className || "text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm px-2 py-1 rounded-none focus:outline-none focus:ring-1 focus:ring-indigo-500"}`,
                            name: "search",
                            value: searchQuery ? searchQuery : "",
                            label: {
                                left: {
                                    text: options.search?.label?.text || "Search",
                                    className: options.search?.label?.className || "text-sm font-medium text-gray-700 p-2"
                                },
                                ...options.search?.label
                            },
                            placeholder: "Search..."
                        }]}
                        onChange={handleSearchChange}
                        wrapper={wrapper}
                        {...input}
                    />
                )}
            </div>
            </React.Fragment>
        </header>
    );
};