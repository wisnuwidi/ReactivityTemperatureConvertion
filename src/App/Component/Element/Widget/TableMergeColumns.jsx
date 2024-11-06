/**
 * @filename        : TableMergeColumns.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 07-11-2024 04:33:45
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains helper functions for the application.
 */

/**
 * @function mergeColumns
 * This function takes an array of objects which have properties of `thead`, `tbody`, or `tfoot`.
 * Each of this properties must have `columns` and `label` properties.
 * The function will merge the columns of each table section.
 * @param {object[]} mergeConfig - the configuration of columns to merge
 * @returns {object} - the merged columns configuration
 * @example
   const columnsConfig = [
        {
            thead: {
                columns: ['name', 'age'],
                label: 'Data Karyawan'
            },
            tbody: {
                columns: ['salary', 'bonus'],
                label: 'Financial Summary'
            },
            tfooter: {
                columns: ['salary', 'bonus'],
                label: 'Financial Summary'
            }
        },
        {
            thead: {
                columns: ['position', 'category'],
                label: 'Job Information'
            }
        }
   ];

 * const mergedColumns = mergeColumns(columnsConfig);
 * console.log(mergedColumns);
   {
       thead: [
           { columns: ['name', 'age'], label: 'Data Karyawan', length: 2 },
           { columns: ['position', 'category'], label: 'Job Information', length: 2 }
       ],
       tbody: [
           { columns: ['salary', 'bonus'], label: 'Financial Summary', length: 2 }
       ],
       tfooter: []
   }
 */
   export const TableMergeColumns = (mergeConfig) => {
    const mergedColumns = { thead: [], tbody: [], tfooter: [] };
    if (mergeConfig) {
        mergeConfig.forEach((config) => {
            Object.keys(config).forEach((tableSection) => {
                const { columns, label } = config[tableSection];
                if (mergedColumns[tableSection]) {
                    mergedColumns[tableSection].push({
                        columns: columns,
                        label: label,
                        length: columns.length,
                    });
                }
            });
        });
    }

    return mergedColumns;
}