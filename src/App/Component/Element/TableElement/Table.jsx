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
 * @param {function} [props.onRowClick] - A callback function that will be called when a table row
 * is clicked.
 * @param {function} [props.onCellClick] - A callback function that will be called when a table cell
 * is clicked.
 * @param {object} [props.cellProps] - An object with key-value pairs for the table cells.
 * @param {function} [props.customCell] - A callback function that will be called when a table cell
 * is rendered. The function must return a React component.
 * @example
 * <Table
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
        onRowClick={(event, row) => console.log('row clicked', row)}
        onCellClick={(event, row, cell) => console.log('cell clicked', row, cell)}
        cellProps={{
            style: {
                padding: '10px',
                border: '1px solid #ccc'
            }
        }}
        customCell={(row, cell) => <a href="#">{cell}</a>}
    />
 */
function Table ({ className, head = {}, data = [], onRowClick, onCellClick, cellProps = {}, customCell }) {
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

    return (
        <table className={className}>
            <thead>
                <tr>
                    {Object.keys(head).map((key) => (
                        <th key={key}>{head[key]}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, index) => (
                    <tr key={index} onClick={(event) => handleRowClick(event, row)}>
                        {Object.keys(head).map((key) => (
                            <td key={key} onClick={(event) => handleCellClick(event, row, row[key])} {...cellProps}>
                                {customCell ? customCell(row, row[key]) : row[key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;