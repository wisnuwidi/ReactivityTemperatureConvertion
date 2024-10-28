/**
 * @filename        : Label.js
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 23-10-2024, 21:45:43
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering a label element in a form.
 */

import React, { useEffect } from 'react';
import { HandleDuplicateValues, NextIncrement, GetPrefixSuffix } from '../../Helper/ConstantMotion';

/**
 * @function Label
 * @description A function component for rendering a label element in a form.
 * @param {object} props - The props object.
 * @param {string} props.children - The text content of the label element.
 * @param {string} [props.className] - The class name of the label element.
 * @example
 * <Label className="my-label">My Label</Label>
 */
function Labelx ({ children, ...props }) {
    return (
        <label {...props}>
            {children}
        </label>
    );
}

const Label = ({text, htmlFor, increments, position, ...props}) => {
    const getNextLabel = (text, index, increments, position) => NextIncrement(index, increments, text, position);
    
    return (
        <label htmlFor={htmlFor} {...props}>
            { 
                increments ? 
                getNextLabel (
                    text, 
                    position === 'left' ? 0 : 1,
                    increments,
                    GetPrefixSuffix(increments?.prefix, increments?.suffix)
                ) : text
            }
        </label>
    );
};

export default Label;