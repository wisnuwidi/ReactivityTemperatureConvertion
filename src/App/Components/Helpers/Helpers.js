/**
 * @filename        : Helpers.js
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 15-10-2024 15:20:08
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY (incodiy@gmail.com)
 * @description     : This file contains helper functions for the application.
 */

import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

export const getElm = (element, node = false) => {
    if ('id' === node) {
        return document.getElementById(element);
    } else if ('class' === node) {
        return document.getElementsByClassName(element);
    } else {
        return document.querySelector(element);
    }
}

export const preventReactDOMRootConflict = (basElm, rendElm) => {
    if (!window.infoBoxRoot) {
        window.infoBoxRoot = ReactDOM.createRoot(getElm(`#${basElm}`));
    }
    window.infoBoxRoot.render(rendElm);
}

export const NotificationInfo = (props) => {
    return <div className={props.class} onClick={e => e.currentTarget.remove()}><span className="close-btn">×</span>{props.text}</div>;
};

/**
 * Set the style of an element based on the given instruction.
 * If the element is not specified, this function will return the given style.
 * @param {string} style
 * @param {string|HTMLElement} [element='']
 */
export const setStyle = (style, element = '') => {
    if ('' === element) {
        return style;
    } else {
        return element.className = style;
    }
}

/**
 * Function to manipulate elements based on the given instruction.
 * 
 * @param {string} element - The element to manipulate.
 * @param {string} instruction - The instruction to perform on the element.
 * @param {string} node - The type of node ('id' or 'class') for the element.
 */
function ElementalManipulation(element, instruction, node, newElement = '') {
    const targetElement = getElm(`${node}${element}`);
    switch (instruction) {
        case 'blur'             : targetElement.blur();              break;
        case 'focus'            : targetElement.focus();             break;
        case 'clear' || 'reset' : targetElement.value     = '';      break;
        case 'set'              : targetElement.value     = element; break;
        case 'replace'          : targetElement.className = element; break;
        case 'disable'          : targetElement.disabled  = true;    break;
        case 'enable'           : targetElement.disabled  = false;   break;
        case 'hide'             : setStyle('hide', targetElement);   break;
        case 'show'             : setStyle('show', targetElement);   break;
        case 'addChild': 
            ReactDOM.createRoot(targetElement).render(newElement);
            break;
        case 'removeChild'      : targetElement.innerHTML = '';      break;
        case 'toggle': 
            targetElement.classList.toggle(newElement);
            break;
        case 'copy':
            targetElement.select();
            document.execCommand('copy');
            break;
        case 'paste':
            targetElement.select();
            document.execCommand('paste');
            break;
        default: return false;
    }
}

/**
 * ManipulateElements is a function that takes in an array of elements, an instruction, and an optional
 * node type ('id' or 'class'). It then performs the given instruction on the elements. If the elements
 * are an array, it will loop through each element and perform the instruction. If the elements are a
 * string, it will perform the instruction on the single element.
 *
 * @param {string|array} elements - The array of elements to manipulate or a single element.
 * @param {string} instruction - The instruction to perform on the elements.
 * @param {string} [node='id'] - The type of node to target. Options are 'id' or 'class'.
 */
export const ManipulateElements = (elements, instruction, node = 'id', newElement = '') => {
    let nodeElm = node;
    if ('id'    === node) nodeElm = '#';
    if ('class' === node) nodeElm = '.'
    
    if (Array.isArray(elements)) {
        elements.map((element) => {
            return ElementalManipulation(element, instruction, nodeElm, newElement);
        });
    } else {
        ElementalManipulation(elements, instruction, nodeElm, newElement);
    }
}

export const CalculateTemperature = (element, input) => {
	let resultData;
    
    if ('celcius' === getElm(element).value) {
        /*(inputValue °C × 9/5) + 32 = Result °F*/
        resultData = Math.floor((parseFloat(input) * 9/5) + 32);
    } else {
        /*(inputValue °F − 32) × 5/9 = Result °C*/
        resultData = Math.ceil((parseFloat(input) - 32) * 5/9);
    }
    
	return resultData;
}

/**
 * Function to handle event change and update state of element which is used by
 * StateEffectElement hook.
 * 
 * @param {Object} props - The props of the element.
 * @param {string} props.id - The id of the element.
 * @param {Object} [props.options] - The options object.
 * @param {boolean} [props.options.disabled] - The disabled property of the element.
 * @param {Object} [props.options.interact] - The dynamic properties of the element.
 * 
 * @returns {Function} The event handler function.
 * @example
 * const eventChange = StateEffectElement({
 *     id: 'inputCalcID',
 *     options: {
 *         className: 'input s-75',
 *     },
 *     interact: {
 *         onInput: (event) => {
 *             const calcInput       = document.getElementById('inputCalcID');
 *             const inputValue      = calcInput.value;
 *             const calculation     = document.getElementById('calculation');
 *             calculation.innerHTML = `Hasil: ${inputValue}`;
 *         }
 *     }
 * });
 */
export const StateEffectElement = ({ id, options = {} }) => {
    const { disabled = true, ...interact } = options;
    const [value, setValue] = useState('');

    useEffect(() => {
        const element    = document.getElementById(id);
        element.disabled = disabled || !Object.keys(interact).some(key => interact[key] === value);
        element.value    = '';

        if (value !== '' || !disabled) {
            element.disabled = false;
            element.focus();
        }
        
        Object.assign(element, interact);
    }, [value, id, disabled, interact]);

    return (event) => setValue(event.target.value);
}
