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

/**
 * @function Label
 * @description A function component for rendering a label element in a form.
 * @param {object} props - The props object.
 * @param {string} props.children - The text content of the label element.
 * @param {string} [props.className] - The class name of the label element.
 * @example
 * <Label className="my-label">My Label</Label>
 */
function Label ({ children, ...props }) {
    return (
        <label {...props}>
            {children}
        </label>
    );
}

export default Label;