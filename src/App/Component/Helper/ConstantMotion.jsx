/**
 * @filename        : ConstantMotion.js
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 21-10-2024 10:57:32
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains helper functions for the application.
 */

import React, { useEffect } from 'react';

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
 * Checks for duplicate values between two or more objects or arrays in the given data.
 * Modifies the names and ids of the selects to ensure uniqueness.
 * 
 * @param {Array} selects - The array of select objects.
 * @param {Array} addable - The array of addable objects containing status and default properties.
 * @example
 * const selects = [
 *   { name: 'select1', id: 'id1' },
 *   { name: 'select2', id: 'id2' }
 * ];
 * const addable = [
 *   {
 *     status: true,
 *     default: { name: 'select1', id: 'id1' }
 *   }
 * ];
 * handleDuplicateCheck(selects, addable);
 *
export const HandleDuplicateArray = (selects, addable) => {console.log(selects)
    if (!addable.length || !addable[0].status) return;
    
    let everFoundDuplicate = {};
    let firstSelectCheck = [selects[0].name, selects[0].id];
    let firstAddableCheck = [addable[0].default.name, addable[0].default.id];
    const isSameName = firstSelectCheck[0] === firstAddableCheck[0];
    const isSameId = firstSelectCheck[1] === firstAddableCheck[1];
    
    if (isSameName && isSameId) {
        everFoundDuplicate.name = true;
        everFoundDuplicate.id = true;
    } else if (isSameName) {
        everFoundDuplicate.name = true;
    } else if (isSameId) {
        everFoundDuplicate.id = true;
    }

    if (selects.length === 1) {
        if (isSameName && isSameId) {
            selects[0].name = `${selects[0].name}[0]`;
            selects[0].id = `${selects[0].id}[0]`;
        } else if (isSameName) {
            selects[0].name = `${selects[0].name}[0]`;
        } else if (isSameId) {
            selects[0].id = `${selects[0].id}[0]`;
        }
    }
    
    if (selects.length === 2 && Object.values(everFoundDuplicate).some(value => value === true)) {
        addable[0].default.name = addable[0].default.name.replace('[1]', '');
        addable[0].default.id = addable[0].default.id.replace('[1]', '');
    }
    
    if (selects.length >= 2) {
        everFoundDuplicate = {};
    }
};*/