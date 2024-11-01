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

export const exportToExcel = (data, outputName = 'dataExported.xlsx', sheetName = 'Sheet1') => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    const workbookBlob = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
    const url = window.URL.createObjectURL(new Blob([workbookBlob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = outputName;
    link.click();
    window.URL.revokeObjectURL(url);
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
       body: tableData.map(row => Object.values(row)),
       theme: 'striped',
       styles: {
           overflow: 'linebreak',
           fontSize: 12,
       },
       columnStyles,
   });
   const pdfBlob = pdf.output("blob");
   const url = window.URL.createObjectURL(pdfBlob);
   const link = document.createElement('a');
   link.href = url;
   link.download = outputName;
   link.click();
   window.URL.revokeObjectURL(url);
};

export const copyToClipboard = (data, notificationText = 'Copied to clipboard', notificationStyle = {}, outputName = false) => {
    const textArea = document.createElement('textarea');
    textArea.value = data.map(row => Object.values(row).join('\t')).join('\n');
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    
    const notification = document.createElement('div');
    notification.textContent = notificationText;
    Object.assign(notification.style, {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        ...notificationStyle
    });
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);

    if (outputName) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([data.map(row => Object.values(row).join('\t')).join('\n')], { type: 'text/plain' }));
        link.download = outputName;
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