/**
 * @filename        : Table.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 07-11-2024, 13:54:24
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for widget table.
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
        <header className="flex justify-between content-center items-center">
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
                        className : "w-1/4",
                    }}
                />
            )}
            <div className="w-2/4">
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
            <div className="w-1/4">
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
                        wrapper={{
                            ...wrapper,
                            className: `${wrapper?.className || "flex justify-end"}`
                        }}
                        {...input}
                    />
                )}
            </div>
        </header>
    );
};

/**
 * @function TableMergeColumns
 * 
 * @description
 *      This function is designed to merge columns in a table based on the specified configuration. 
 *      It takes an array of merge configurations and an array of data columns, returning a new configuration 
 *      with merged columns and metadata about the merged columns.
 *
 * @param {object[]} mergeConfig - An array of objects defining the configuration for column merging. 
 *      Each object should have:
 *          - columns: {array} An array of strings representing the column keys to be merged.
 *          - label: {string} A string representing the label for the merged columns.
 * @param {string[]} dataColumns - An array of strings representing the current data columns.
 * @returns {object} - An object containing:
 *      - dataColumns: {array} An array of strings representing the new data columns with merged configurations.
 *      - childColumns: {object} An object mapping merged column labels to their original columns and colspan.
 *
 * @example
 *      const columnsConfig = [
 *          {
 *              columns: ['name', 'age'],
 *              label: 'Employee Data'
 *          },
 *          {
 *              columns: ['position', 'category'],
 *              label: 'Job Information'
 *          }
 *      ];
 *      const dataCols = ['name', 'age', 'position', 'category', 'salary'];
 *      const result = TableMergeColumns(columnsConfig, dataCols);
 *      console.log(result);
 *      // Output:
 *      // {
 *      //     dataColumns: ['Employee Data', 'Job Information', 'salary'],
 *      //     childColumns: {
 *      //         employee_data: { columns: ['name', 'age'], colspan: 2 },
 *      //         job_information: { columns: ['position', 'category'], colspan: 2 }
 *      //     }
 *      // }
 */
export const TableMergeColumns = (mergeConfig, dataColumns = []) => {
    const mergedNodes  = [];
    const replaceNodes = [];
    const hideNodes    = [];

    Object.keys(mergeConfig).forEach((key) => {
        mergedNodes.push({
            nodeIndex : dataColumns.indexOf(mergeConfig[key].columns[0]),
            columns   : mergeConfig[key].columns
        });
        
        mergeConfig[key].columns.forEach((column, nodeIndex) => {
            if (0 === nodeIndex) {
                replaceNodes[column] = mergeConfig[key].label;
            }
            hideNodes[mergeConfig[key].label] = { columns: mergeConfig[key].columns.slice(1) };
        });
    });
    
    let mergeStatus = false;
    const mergedCols  = [];
    let hideCols = [];
    let n = 0;
    const mergedNodeInfo = {};
    mergedNodes.forEach((item) => {
        const nodeIndex = item.nodeIndex;
        item.columns.forEach((column, index) => {
            if (0 === index) mergedCols[nodeIndex] = replaceNodes[column];
            if (undefined !== replaceNodes[column]) {
                let replaceNodeColumns = replaceNodes[column] ? replaceNodes[column].toLowerCase().replace(/\s+/g, '_') : '';
                mergedNodeInfo[replaceNodeColumns]  = {
                    columns: item.columns,
                    colspan: item.columns.length
                };
                mergeStatus = true;
            }

            n++;
        });

        if (hideNodes[mergedCols[nodeIndex]]) {
            hideCols.push({columns: hideNodes[mergedCols[nodeIndex]].columns});
        }
    });

    let hideColumns = [];
    if (hideCols) {
        hideCols.forEach((item) => {
            item.columns.forEach((column) => {
                hideColumns[column] = dataColumns.indexOf(column);
            });
        });
    }
    
    let replaceDataColumns = [];
    replaceDataColumns = dataColumns.map((item) => {
        if (!hideColumns[item]) {
            return item;
        }
    });

    let newDataColumns = replaceDataColumns.map((item, index) => {
        if (mergedCols[index]) {
            return mergedCols[index];
        }
        
        return item;
    });

    newDataColumns = newDataColumns.filter(item => typeof item !== 'undefined');

    const dataColumnLists = {
        dataColumns  : newDataColumns,
        childColumns : mergedNodeInfo
    };
    
    if (true === mergeStatus) {
        return dataColumnLists;
    }
}
