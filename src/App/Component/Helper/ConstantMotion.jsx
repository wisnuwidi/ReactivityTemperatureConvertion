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
 * Logs the provided arguments to the console.
 *
 * @param {*} args - The arguments to be logged.
 */
export const LogCons = (args) => {
    console.log(args);
}

/**
 * Returns the current date as a string formatted according to the specified options.
 * 
 * This function uses React state to hold the current date and updates it every second using setInterval.
 * The date is formatted using toLocaleDateString with the provided options or defaults.
 * 
 * @param {object} [options=false] - An object specifying the date formatting options.
 * @param {boolean} [options.weekday] - If true, includes the weekday in the formatted date.
 * @param {boolean} [options.year] - If true, includes the year in the formatted date.
 * @param {boolean} [options.month] - If true, includes the month in the formatted date.
 * @param {boolean} [options.day] - If true, includes the day in the formatted date.
 * @param {string} [options.locale='id'] - The locale to use for formatting the date string.
 * 
 * @returns {string} - The formatted current date string based on the specified options.
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
 * Returns the current time as a string formatted according to the specified options.
 * 
 * This function uses React state to hold the current time and updates it every second using setInterval.
 * The time is formatted using toLocaleTimeString with the provided options or defaults.
 * 
 * @param {object} [options=false] - An object specifying the time formatting options.
 * @param {boolean} [options.hour] - If true, includes the hour in the formatted time.
 * @param {boolean} [options.minute] - If true, includes the minute in the formatted time.
 * @param {boolean} [options.second] - If true, includes the second in the formatted time.
 * @param {boolean} [options.timeZoneName] - If true, includes the time zone name in the formatted time.
 * @param {string} [options.locale='id'] - The locale to use for formatting the time string.
 * 
 * @returns {string} - The formatted current time string based on the specified options.
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
 * Returns a function that returns a string of letters, incrementing by 1 letter
 * each time it is called. The letters are chosen from a given string. If the
 * given string is not provided, the english alphabet is used.
 *
 * @param {string} [chars] The string of characters to use.
 * @returns {function(): string} A function that returns a string of letters.
 * @linkcode https://stackoverflow.com/a/12504061/27955486
 *
 * @example
 * const alphaNext = AlphaNext();
 * console.log(alphaNext()); // 'a'
 * console.log(alphaNext()); // 'b'
 * console.log(alphaNext()); // 'c'
 * console.log(alphaNext()); // 'd'
 */
export const AlphaNext = (chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') => {
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