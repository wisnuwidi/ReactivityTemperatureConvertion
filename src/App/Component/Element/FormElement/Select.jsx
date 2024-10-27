/**
 * @filename        : Select.js
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 23-10-2024, 21:41:19
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering a single or multiple select elements in a form.
 */

import React, { useState, useEffect } from 'react';
import { HandleDuplicateValues } from '../../Helper/ConstantMotion';


/**
 * @example
    <Select
        data={[
            {
                name: "select1",
                id: "select1-id", 
                label: { text: "Select your option", className: "select-label" },
                options: [
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" }
                ],
                className: "custom-select",
                placeholder: "Please select",
                value: ["option1"],
                required: true
            }
        ]}
        onChange={(event) => console.log(event.target.value)}
        wrapper={[{
            tag: "span",
            className: "custom-wrapper",
            style: {
                display: "flex"
            }
        }]}
    />
 */
export const Select = ({ data = [], onChange, wrapper = [], ...props }) => {
    const [selects, setSelects] = useState(() => HandleDuplicateValues(data, ['name', 'id'], ''));

    const [selectedValues, setSelectedValues] = useState(selects.reduce((acc, select) => ({ ...acc, [select.name]: select.value ? select.value[0] : '' }), {}));

    useEffect(() => {
        setSelects(HandleDuplicateValues(data, ['name', 'id'], ''));
        setSelectedValues(selects.reduce((acc, select) => ({ ...acc, [select.name]: select.value ? select.value[0] : '' }), {}));
    }, [data]);

    const handleChange = (index, event) => {
        const updatedSelects = selects.map((select, i) =>
            i === index ? { ...select, value: event.target.value } : select
        );
        setSelects(updatedSelects);
        setSelectedValues(updatedSelects.reduce((acc, select) => ({ ...acc, [select.name]: select.value ? select.value[0] : '' }), {}));
        if (onChange) {
            onChange(event);
        }
    };

    const WrapperTag = wrapper[0]?.tag || 'div';

    return (
        <>
            {selects.map((select, index) => (
                <WrapperTag key={index} {...wrapper[0]}>
                    {select.label && (
                        <label htmlFor={select.id} {...select.label.props}>
                            {select.label.text}
                        </label>
                    )}
                    <select
                        name={select.name}
                        id={select.id}
                        className={select.className}
                        value={selectedValues[select.name] || ''}
                        required={select.required}
                        onChange={event => handleChange(index, event)}
                        {...select.props}
                    >
                        {!selectedValues[select.name] && <option value="" disabled>{select.placeholder}</option>}
                        {select.options.map((option, i) => (
                            <option key={i} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </WrapperTag>
            ))}
        </>
    );
};
