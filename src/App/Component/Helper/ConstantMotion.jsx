/**
 * @filename        : ConstantMotion.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 21-10-2024 10:57:32
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains helper functions for the application.
 */

import React, { useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Mencetak argumen yang diberikan ke konsol.
 *
 * @param {*} args - Argumen yang akan dicetak.
 */
export const LogCons = (args) => {
    console.log(args);
}

/**
 * Mengembalikan tanggal saat ini sebagai string yang diformat sesuai dengan opsi yang ditentukan.
 * 
 * Fungsi ini menggunakan state React untuk menyimpan tanggal saat ini dan memperbaruinya setiap detik menggunakan setInterval.
 * Tanggal diformat menggunakan toLocaleDateString dengan opsi yang diberikan atau default.
 * 
 * @param {object} [options=false] - Sebuah objek yang menentukan opsi format tanggal.
 * @param {boolean} [options.weekday] - Jika true, menyertakan hari dalam tanggal yang diformat.
 * @param {boolean} [options.year] - Jika true, menyertakan tahun dalam tanggal yang diformat.
 * @param {boolean} [options.month] - Jika true, menyertakan bulan dalam tanggal yang diformat.
 * @param {boolean} [options.day] - Jika true, menyertakan hari dalam tanggal yang diformat.
 * @param {string} [options.locale='id'] - Lokal yang digunakan untuk memformat string tanggal.
 * 
 * @returns {string} - String tanggal saat ini yang diformat berdasarkan opsi yang ditentukan.
 */
export const DateTime = (options) => {
    const [date, setDate] = React.useState(new Date());
    
    if (options.weekday) {
        options = {weekday: 'long'}
    } else if (options.year) {
        options = {year: 'numeric'}
    } else if (options.month) {
        options = {month: 'long'}
    } else if (options.day) {
        options = {day: 'numeric'}
    } else {
        options = {
            weekday : 'long',
            year    : 'numeric',
            month   : 'long',
            day     : 'numeric',
        }
    }

    useEffect(() => {
        const intervalDate = setInterval(() => {
            setDate(new Date());
        }, 1000);
        
        return () => {
            clearInterval(intervalDate);
        };
    }, [date]);
    
    return date.toLocaleDateString(options.locale || 'id', options);
}

/**
 * Mengembalikan waktu saat ini sebagai string yang diformat sesuai dengan opsi yang ditentukan.
 * 
 * Fungsi ini menggunakan state React untuk menyimpan waktu saat ini dan memperbaruinya setiap detik menggunakan setInterval.
 * Waktu diformat menggunakan toLocaleTimeString dengan opsi yang diberikan atau default.
 * 
 * @param {object} [options=false] - Sebuah objek yang menentukan opsi format waktu.
 * @param {boolean} [options.hour] - Jika true, menyertakan jam dalam waktu yang diformat.
 * @param {boolean} [options.minute] - Jika true, menyertakan menit dalam waktu yang diformat.
 * @param {boolean} [options.second] - Jika true, menyertakan detik dalam waktu yang diformat.
 * @param {boolean} [options.timeZoneName] - Jika true, menyertakan nama zona waktu dalam waktu yang diformat.
 * @param {string} [options.locale='id'] - Lokal yang digunakan untuk memformat string waktu.
 * 
 * @returns {string} - String waktu saat ini yang diformat berdasarkan opsi yang ditentukan.
 */
export const Clock = (options = false) => {
    const [clock, setClock] = React.useState(new Date());
    
    if (options.hour) {
        options = {hour: 'numeric'}
    } else if (options.minute) {
        options = {minute: 'numeric'}
    } else if (options.second) {
        options = {second: 'numeric'}
    } else if (options.timeZoneName) {
        options = {timeZoneName: 'numeric'}
    } else {
        options = {
            hour            : 'numeric',
            minute          : 'numeric',
            second          : 'numeric',
            timeZoneName    : 'short'
        }
    }
    
    useEffect(() => {
        const intervalClock = setInterval(() => {
            setClock(new Date());
        }, 1000);
        
        return () => {
            clearInterval(intervalClock);
        };
    }, [clock]);
    
    return clock.toLocaleTimeString(options.locale || 'id', options);
}

/**
 * Mengembalikan fungsi yang mengembalikan string huruf, menambah 1 huruf setiap
 * kali dipanggil. Huruf-huruf tersebut dipilih dari string yang diberikan. Jika
 * string yang diberikan tidak ada, maka alfabet bahasa inggris yang digunakan.
 *
 * @param {string} [chars] String karakter yang digunakan.
 * @returns {function(): string} Fungsi yang mengembalikan string huruf.
 * @linkcode https://stackoverflow.com/a/12504061/27955486
 *
 * @example
 * const alphaNext = AlphaNext();
 * console.log(alphaNext()); // 'a'
 * console.log(alphaNext()); // 'b'
 */
export const AlphaNext = (chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    let nextId = [0];

    return () => {
        const r = [];
        for (const char of nextId) {
            r.unshift(chars[char]);
        }

        for (let i = 0; i < nextId.length; i++) {
            const val = ++nextId[i];
            if (val >= chars.length) {
                nextId[i] = 0;
            } else {
                return r.join('');
            }
        }

        nextId.push(0);

        return r.join('');
    };
};

/**
 * Mengembalikan string berikutnya dalam urutan, berdasarkan parameter increment dan posisi yang diberikan.
 * Jika teks berupa angka atau kosong, string increment digunakan sebagai konteks berikutnya.
 * Jika teks bukan angka dan tidak kosong, konteks berikutnya ditentukan berdasarkan parameter posisi.
 *
 * @param {number} index - Indeks saat ini dalam urutan.
 * @param {object} increments - Objek yang berisi jenis dan nilai increment.
 * @param {string} text - Konteks saat ini.
 * @param {string} pos - Posisi string increment dalam konteks berikutnya.
 * @returns {string} Konteks berikutnya dalam urutan.
 */
export const NextIncrement = (index, increments, text, pos) => {
    if (!increments) return false;

    let incrementedPart = '';
    if (increments.type === 'number') {
        incrementedPart = index + 1;
    } else if (increments.type === 'alphabetical') {
        const alphaNext = AlphaNext();
        let nextLoop = 0;
        for (let i = 0; i < index; i++) {
            nextLoop = index + 1;
            alphaNext(nextLoop);
        }

        incrementedPart = alphaNext(nextLoop);
    }

    // create the next context based on the type of increment and the position of the increment string
    // if the text is not a number and not empty, use the position to determine the placement of the increment string
    // if the text is a number or empty, use the increment string as the next context
    let nextContext = '';
    if (pos === false) {
        nextContext = '';
    } else {
        nextContext = isNaN(text) && text !== '' ?
            pos === 'prefix' ? `${incrementedPart} ${text}` :
            pos === 'suffix' ? `${text} ${incrementedPart}` :
            `${incrementedPart} ${text} ${incrementedPart}` :
            incrementedPart;
    }
    
    return nextContext;
};

export const GetPrefixSuffix = (prefix, suffix) => prefix && suffix ? 'prefix|suffix' : prefix ? 'prefix' : suffix ? 'suffix' : false;

/**
 * Menghandle duplikasi nilai dalam array of object.
 * Jika nilai duplicate ditemukan, maka akan ditambahkan suffix berupa indeks atau pointer yang diberikan.
 * Jika pointer tidak diberikan maka akan menggunakan indeks array sebagai suffix.
 * Jika pointer adalah string kosong maka tidak akan ditambahkan suffix.
 * Fungsi ini akan mengembalikan array of object yang telah di rename.
 *
 * @param {array} data - Data yang akan dihandle.
 * @param {array} [node=['name']] - Node yang akan di cek untuk duplikasi nilai.
 * @param {string} [pointer='[]'] - Pointer yang akan digunakan sebagai suffix.
 * @returns {array} - Array of object yang telah di rename.
 */
export const FindDuplicateArrayValue = (data, node = ['name', 'id'], pointer = '[]') => {
    let renamedData = data;

    if (node.length >= 1) {
        node.forEach((key) => {
            const lists = data.map((item) => item[key]);
            const duplicates = lists.filter((list, index) => lists.indexOf(list) !== index);
            let increment = 0;
            
            renamedData = renamedData.map((item) => {
                if (duplicates.includes(item[key])) {
                    item[key] = `${item[key]}[${increment}]`;
                    increment++;
                }
                return item;
            });
        });
    }


    return renamedData;
};

/**
 * Exports the provided data to an Excel file (.xlsx) and saves it to the user's local machine.
 *
 * @param {array} data - The data to be exported to the Excel file.
 * @param {string} [outputName='dataExported.xlsx'] - The name of the output Excel file.
 * @param {string} [sheetName='Sheet1'] - The name of the sheet in the Excel file.
 */
export const exportToExcel = (data, outputName = 'dataExported.xlsx', sheetName = 'Sheet1') => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = { Sheets: { [sheetName]: worksheet }, SheetNames: [sheetName] };
    const workbookBlob = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const url = URL.createObjectURL(new Blob([workbookBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = outputName;
    link.click();
    URL.revokeObjectURL(url);
};

/**
* @function generatePdf
*
* @description
*      Generates a PDF document from the provided table data using the specified options.
*      The user can set the output name and column styles for the generated PDF.
*
* @param {array} head - An array of table header names.
* @param {array} tableData - An array of table row data.
* @param {string} [outputName='data.pdf'] - The name for the output PDF file.
* @param {object} [columnStyles={}] - An object mapping column indices to style objects.
*
* @example
*      generatePdf(
*          Object.keys(head),
*          tableData,
*          'customData.pdf',
*          {
*              0: { halign: 'center', cellWidth: 40 },
*              1: { halign: 'center', cellWidth: 50 }
*          }
*      );
*/
export const generatePdf = (head, tableData, outputName = 'data.pdf', columnStyles = {}) => {
    const pdf = new jsPDF();
    pdf.autoTable({
        head: [head],
        body: tableData,
        theme: 'striped',
        styles: {
            overflow: 'linebreak',
            fontSize: 12,
        },
        columnStyles,
    });

    const pdfBlob = pdf.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = outputName;
    link.click();
    URL.revokeObjectURL(url);
};


/**
 * Copies data to the clipboard in a tab-separated format and displays a notification with an animation.
 *
 * @param {array} data - The data to be copied to the clipboard, given as an array of objects where each
 *     object property is a column name and the value is the cell value.
 * @param {string} [notificationText='Copied to clipboard'] - The text to be displayed in the notification.
 * @param {object} [notificationStyle={}] - An object mapping CSS style names to values. The object will be
 *     merged with the default notification style.
 * @param {string} [outputName=false] - If truthy, a link to download the data as a text file will be
 *     created and clicked.
 *
 * @example
 *      copyToClipboard([
 *          { id: 1, name: 'John Doe', age: 25 },
 *          { id: 2, name: 'Jane Doe', age: 27 },
 *      ], 'Data copied', { backgroundColor: 'rgba(0,255,112,0.2)' }, 'data.txt');
 */
export const copyToClipboard = (data, notificationText = 'Copied to clipboard', notificationStyle = {}, outputName = false) => {
    const text = data.map(row => Object.values(row).join('\t')).join('\n');

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            const notification = document.createElement('div');
            notification.className = 'fixed bg-blur-sm top-0 right-0 m-2 bg-gradient-to-r from-transparent via-transparent to-transparent px-4 pt-2 pb-3 font-sans font-lighter text-grey-900 text-md text-shadow-md border border-gray-300 animate-pulse';
            Object.assign(notification.style, {
                fontFamily: '"Protest Strike", sans-serif',
                color: 'rgba(255,255,255,0.87)',
                textShadow: 'rgba(0,0,0,0.15) 0px 1px 2px',
                backgroundImage: 'linear-gradient(to right, rgba(0,255,112,0.18) 0%, rgba(255,239,0,0.97) 50%, rgba(255,255,255,0.98) 86%)',
                backgroundSize: '200% 100%',
                animation: 'gradient 3s ease infinite',
                ...notificationStyle,
            });
            notification.textContent = notificationText;
            document.body.appendChild(notification);
            setTimeout(() => notification.remove(), 8000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    copyToClipboard();

    if (outputName) {
        const link = Object.assign(document.createElement('a'), {
            href: URL.createObjectURL(new Blob([text], { type: 'text/plain' })),
            download: outputName,
        });

        link.click();
        URL.revokeObjectURL(link.href);
    }
};

/**
     * @function exportToCsv
     *
     * @description
     *      Generates a CSV file from the provided table data using the specified options.
     *      The user can set the output name, column styles for the generated CSV.
     *
     * @param {array} tableData - An array of table row data.
     * @param {string} [outputName='data.csv'] - The name for the output CSV file.
     * @param {object} [columnStyles={}] - An object mapping column indices to style objects.
     *
     * @example
     *      exportToCsv(
     *          tableData,
     *          'customData.csv',
     *          {
     *              0: { halign: 'center', cellWidth: 40 },
     *              1: { halign: 'center', cellWidth: 50 }
     *          }
     *      );
     */
export const exportToCsv = (tableData, outputName = 'data.csv', columnStyles = {}) => {
    const csv = tableData.map(row => Object.values(row).join(',')).join('\n');
    const url = window.URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const link = document.createElement('a');

    link.href = url;
    link.download = outputName;
    link.click();

    window.URL.revokeObjectURL(url);
};
export const SetExceptionProps = (wrapper, exceptionKeys) => {
    return Object.keys(wrapper).reduce((obj, key) => {
        if (!exceptionKeys.includes(key)) {
            obj[key] = wrapper[key];
        }
        return obj;
    }, {});
};

/**
 * Format currency in Indonesian locale by Default
 * 
 * @param {number} number - The number to be formatted
 * @param {object} config - The configuration object
 * @param {string} [config.locale=id-ID] - The locale
 * @param {string} [config.label=Rp ] - The label
 * @param {string} [config.style=currency] - The style
 * @param {string} [config.currency=IDR] - The currency
 * @param {number} [config.minimumFractionDigits=0] - The minimum fraction digits
 * @param {number} [config.maximumFractionDigits=0] - The maximum fraction digits
 * @returns {string} The formatted currency
 * @example
 * FormatCurrency(10000, {locale: 'id-ID', label: 'Rp ', minimumFractionDigits: 0, maximumFractionDigits: 0});
 * // 'Rp 10.000'
 */
export const FormatCurrency = (number, config = {}) => {
    const {locale, currency, style = 'currency'} = config;
    let {minimumFractionDigits, maximumFractionDigits} = config;
    
    maximumFractionDigits = 
        maximumFractionDigits < minimumFractionDigits ? 
        minimumFractionDigits ? minimumFractionDigits : maximumFractionDigits ?  
        maximumFractionDigits : 0 : maximumFractionDigits;
    
    return number.toLocaleString('id-ID', {
        currency: currency ? currency || 'IDR' : undefined,
        locale: currency ? locale || 'id-ID' : undefined,
        style: currency ? style || 'currency' : undefined,
        minimumFractionDigits: minimumFractionDigits || 0,
        maximumFractionDigits: maximumFractionDigits,
    });
};