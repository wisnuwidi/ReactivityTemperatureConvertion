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
import { FindDuplicateArrayValue, NextIncrement } from '../../Helper/ConstantMotion';
import Label from '../FormElement/Label';

/**
 * @example
    <Select
        data={[
            {
                name: "select1",
                id: "select1-id", 
                options: [
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" }
                ],
                className: "custom-select",
                placeholder: "Please select",
                label: { 
                    text: "Select your option", 
                    className: "select-label", 
                    position:"left", 
                    increments: {
                        type: "alphabetical",
                        prefix: true,
                        suffix: false
                    }
                },
                value: ["option1"],
                required: true
            }
        ]}
        addable={{
            status: true,
            selectProps: {
                name: "selectNew",
                id: "selectNew-id",
                options: [
                    { value: "option3", label: "Option 3" },
                    { value: "option4", label: "Option 4" }
                ],
                className: "custom-select",
                placeholder: "Please select"
            },
            label: {
                text: "Add new select",
                className: "select-label",
                position: "left",
                increments: {
                    type: "alphabetical",
                    prefix: true,
                    suffix: false
                }
            },
            button: {
                text: "Add",
                type: "button",
                id: "add-select-button",
                className: "custom-button",
                name: "add-select",
                style: {
                    marginLeft: "10px"
                }
            },
            deleteButton: {
                text: "Delete"
            },
            minButtonLeft: 1,
            deleteOnlyAdded: false
        }}
        onChange={(event) => console.log(event.target.value)}
        wrapper={{
            tag: "span",
            className: "custom-wrapper",
            style: {
                display: "flex"
            }
        }}
    />
 */
export const Select = ({ data = [], onChange, wrapper = [], addable = {}, ...props }) => {
    const [selects, setSelects] = useState(() => FindDuplicateArrayValue(data, ['name', 'id'], ''));
    const [selectedValues, setSelectedValues] = useState(selects.reduce((acc, select) => ({ ...acc, [select.name]: select.value ? select.value[0] : '' }), {}));

    useEffect(() => {
        setSelects(FindDuplicateArrayValue(data, ['name', 'id'], ''));
        setSelectedValues(selects.reduce((acc, select) => ({ ...acc, [select.name]: select.value ? select.value[0] : '' }), {}));
    }, [data, addable]);

    const WrapperTag = wrapper?.tag || 'div';

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

    const { prefix, suffix } = addable.label?.increments? addable.label?.increments : '' || {};
    const position           = prefix && suffix ? 'prefix|suffix' : prefix ? 'prefix' : suffix ? 'suffix' : false;
    const getNextLabel       = (baseLabel, index, increments, position) => NextIncrement(index, increments, baseLabel, position);
    const maxElements        = selects.length;

    const handleAddSelect = () => {
        if (addable.status) {
            
            let duplicateData  = data.find((item) => item.name === addable.selectProps.name);
            let countElements  = selects.length - data.length;
            let newElementName = `${addable.selectProps.name}[${countElements}]`;
            let newElementid   = `${addable.selectProps.id}[${countElements}]`;

            let dataDuplicated = [];
            data.map((item, index) => {
                
                
                if (item.name === addable.selectProps.name) data[index].name = `${data[index].name}[${countElements}]`;
                if (item.id   === addable.selectProps.id)   data[index].id   = `${data[index].id}[${countElements}]`;
            })

            selects.map((item, index) => {
                dataDuplicated[index] = {
                    name : item.name.replace(/\[(\d+)\]/g, ''),
                    id   : item.id.replace(/\[(\d+)\]/g, '')
                };
            })

            let maxName = 0;
            let maxId   = 0;
            if (dataDuplicated.find((item) => item.name === addable.selectProps.name)) {
                maxName = dataDuplicated.filter((item) => item.name === addable.selectProps.name).length;
                maxId   = dataDuplicated.filter((item) => item.id   === addable.selectProps.id).length;
            }
            
            const newSelectName = duplicateData ? newElementName : newElementName.replace(/\[(\d+)\]/g, '') + `[${maxName}]`;
            const newSelectId   = duplicateData ? newElementid   : newElementid.replace(/\[(\d+)\]/g, '')   + `[${maxId}]`;
            // Kalo di delete, masih error
            const newSelect = {
                ...addable.selectProps,
                name    : newSelectName,
                id      : newSelectId,
                options : addable?.selectProps?.options || [],
                value   : '',
                label: {
                    text: getNextLabel(addable.label?.text || '', selects.length, addable.label?.increments? addable.label?.increments : '', position),
                    ...addable.label.selectProps
                }
            };
        
            setSelects([...selects, newSelect]);
        }
    };

    const handleDeleteSelect = (index) => {
        if (selects.length > (addable.minButtonLeft || 0) && (!addable.deleteOnlyAdded || selects[index].name !== (data[index] || {}).name)) {
            const updatedSelects = selects.filter((_, i) => i !== index);
            setSelects(updatedSelects);
            setSelectedValues(updatedSelects.reduce((acc, select) => {
            //    console.log(acc);
                return { ...acc, [select.name]: select.value ? select.value[0] : '' };
            }, {}));
        }
    };

    return (
        <>
            {selects.map((select, index) => (
                <WrapperTag key={index} {...wrapper}>
                    {select.label && (!select.label?.position || select.label?.position === 'left') && (
                        <Label
                            text       = {select.label.text}
                            htmlFor    = {select.id}
                            increments = {select.label.increments}
                            position   = {select.label.position}
                            {...select.label.props}
                        />
                    )}
                    <select
                        name      = {select.name}
                        id        = {select.id}
                        className = {select.className}
                        value     = {Array.isArray(select.value) ? select.value[0] : select.value}
                        required  = {select.required}
                        onChange  = {event => handleChange(index, event)}
                        {...select.props}
                    >
                        {!selectedValues[select.name] && <option value="" disabled>{select.placeholder}</option>}
                        {select.options.map((option, i) => (
                            <option key={i} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    {select.label && select.label?.position === 'right' && (
                        <Label
                            text       = {select.label.text}
                            htmlFor    = {select.id}
                            increments = {select.label.increments}
                            position   = {select.label.position}
                            {...select.label.props}
                        />
                    )}
                    {selects.length > (addable.minButtonLeft || 0) && (!addable.deleteOnlyAdded || selects[index].name !== (data[index] || {}).name) && (
                        <button {...addable.deleteButton} onClick={() => handleDeleteSelect(index)}>{addable.deleteButton?.text || "Delete"}</button>
                    )}
                </WrapperTag>
            ))}
            {addable.status && (
                <button {...addable.button} onClick={handleAddSelect}>{addable.button?.text || "Add"}</button>
            )}
        </>
    );
};
