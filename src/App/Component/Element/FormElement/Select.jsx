/**
 * @filename        : Select.js
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 23-10-2024, 21:41:19
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering a single or multiple select elements in a form.
 */

import React, { useEffect } from 'react';
import { AlphaNext } from '../../Helper/ConstantMotion';

/**
 * @function Select
 * @description - A function component for rendering a select element in a form.
 *      This component supports rendering a single select element or multiple select elements.
 *      If the addable prop is true, the component will render a button to add new select elements,
 *      And each new element will have a button to delete it.
 * @param {object} props - The props object.
 * @param {string} props.name - The name of the select element.
 *      If addable is true, this will be the name of the first select element,
 *      And the name of subsequent elements will be the same with an increasing index in brackets
 *      (e.g. "mySelect[0]", "mySelect[1]", etc.).
 * @param {string} [props.className] - The class name of the select element.
 * @param {string} [props.value] - The initial value of the select element.
 * @param {array} [props.options] - An array of objects with value and text properties.
 *      The objects will be used to generate the options of the select element.
 * @param {function} [props.onChange] - A callback function that will be called when the value of the select element changes.
 * @param {boolean} [props.addable=false] - If true, allows adding multiple select elements.
 *      This will enable the "Add" button to create new select elements, and each new element will have a "Delete" button.
 * @param {string} [props.deleteText="Delete"] - The text of the delete button.
 * @param {string} [props.addText="Add"] - The text of the add button.
 * @param {object} [props.wrapperProps={}] - An object with props that will be passed to the wrapper element.
 * @param {object} [props.buttonProps={}] - An object with props that will be passed to all button elements.
 * @param {object} [props.addButtonProps={}] - An object with props that will be passed to the add button element.
 * @param {object} [props.deleteButtonProps={}] - An object with props that will be passed to the delete button element.
 * @param {object} [props.labelProps={}] - An object with props that will be passed to the label element.
 *      The label element will be rendered with the label text and position.
 * @param {string} [props.labelText] - The text of the label.
 * @param {string} [props.labelPosition="left"] - The position of the label, either "left" or "right".
 * @param {string} [props.incrementalType="number"] - The type of the incremental label text, either "number" or "alphabetical".
 * @param {boolean} [props.incrementalPrefix=false] - If true, the incremental label text will be added as a prefix to the active label text.
 * @param {boolean} [props.incrementalSuffix=false] - If true, the incremental label text will be added as a suffix to the active label text.
 * @example
 * <Select
        name="mySelect"
        className="my-select"
        value="option2"
        options={[
            { value: "option1", text: "Option 1" },
            { value: "option2", text: "Option 2" },
            { value: "option3", text: "Option 3" },
        ]}
        onChange={(event) => console.log(event.target.value)}
        addable={true}
        deleteText="Remove"
        addText="Add More"
        wrapperProps={{ className: "my-select-wrapper" }}
        buttonProps={{ className: "my-select-button" }}
        addButtonProps={{ className: "add-button" }}
        deleteButtonProps={{ className: "delete-button" }}
        labelProps={{ className: "my-select-label" }}
        labelText="My select label"
        labelPosition="left"
        incrementalType="alphabetical"
        incrementalPrefix={true}
    />
 * <Select
        name="mySelect"
        className="my-select"
        value="option2"
        options={[
            { value: "option1", text: "Option 1" },
            { value: "option2", text: "Option 2" },
            { value: "option3", text: "Option 3" },
        ]}
        onChange={(event) => console.log(event.target.value)}
        addable={true}
        deleteText="Remove"
        addText="Add More"
        wrapperProps={{ className: "my-select-wrapper" }}
        buttonProps={{ className: "my-select-button" }}
        addButtonProps={{ className: "add-button" }}
        deleteButtonProps={{ className: "delete-button" }}
        labelProps={{ className: "my-select-label" }}
        labelText="My select label"
        labelPosition="left"
        incrementalType="alphabetical"
        incrementalSuffix={true}
    />
 */
export const Select = ({
    options           = [],
    onChange,
    addable           = false,
    addText           = "Add",
    deleteText        = "Delete",
    wrapperProps      = {},
    buttonProps       = {},
    addButtonProps    = {},
    deleteButtonProps = {},
    labelText         = '',
    labelPosition     = 'left',
    labelProps        = {},
    incrementalType   = false,
    incrementalPrefix = false,
    incrementalSuffix = false,
    ...props
}) => {
    const [selects, setSelects] = React.useState([
        { value: props.value, className: props.className }
    ]);

    useEffect(() => {
        setSelects([{ value: props.value, className: props.className }]);
    }, [props.value, props.className]);

    /**
     * Handles the change event for a select element.
     * Updates the value of the select element at the specified index in the state.
     * Calls the onChange callback function with the event if provided.
     * @param {number} index - The index of the select element to update.
     * @param {object} event - The event object from the change event.
     */
    const handleChange = (index, event) => {
        const updatedSelects = selects.map((select, i) => 
            i === index ? { ...select, value: event.target.value } : select
        );
        setSelects(updatedSelects);
        if (onChange) {
            onChange(event);
        }
    };
    
    /**
     * Handles the addition of a new select element.
     * If the addable prop is true, creates a new select object with an auto-generated name,
     * an empty value, and a class name based on the first select element's class name.
     * Adds the new select to the existing selects array and calls the onAdd function with the new select.
     * Also handles generating the label for the new select element based on the label prop's incrementalType.
     * If the incrementalType is 'number', the label is generated by incrementing the number in the previous label.
     * If the incrementalType is 'alphabetical', the label is generated by incrementing the alphabetical letter in the previous label.
     * If the incrementalType is 'false', the label is set to the text property of the label prop.
     */
    const handleAdd = () => {
        const firstClassName = selects[0].className;
        const label = labelProps.text || labelText;

        let newLabel;
        
        if (incrementalType === 'number') {
            newLabel = label + (selects.length + 1)
        } else if (incrementalType === 'alphabetical') {
            const alphaNext = AlphaNext();
            let nextLoop = 0;
            for (let i = 0; i < selects.length; i++) {
                nextLoop = selects.length + 1;
                alphaNext(nextLoop);
            }
            
            if (incrementalPrefix === true) {
                newLabel = alphaNext(nextLoop) + ` ${label.replace(/[0-9]/g, '')}`;
            } else {
                newLabel = `${label.replace(/[0-9]/g, '')} ` + alphaNext(nextLoop);
            }
        }

        setSelects([...selects, { value: '', className: firstClassName, label: newLabel }]);
    };

    /**
     * Deletes the select element at the given index.
     * @param {number} index - The index of the select element to delete.
     */
    const handleDelete = (index) => {
        setSelects(selects.filter((_, i) => i !== index));
    };

    const nameAttribute = addable ? `${props.name}[]` : props.name;

    const labelStyle    = labelPosition === 'left' ? { float: 'left' } : { float: 'right' };

    return (
        <>
            {selects.map((select, index) => (
                <div key={index} {...wrapperProps}>
                    {labelPosition === 'left' && select.label && (
                        <label
                            {...labelProps}
                            className={labelProps.className}
                            style={labelStyle}
                        >
                            {select.label}
                        </label>
                    )}
                    <select
                        name={nameAttribute}
                        value={select.value}
                        onChange={(event) => handleChange(index, event)}
                        className={select.className}
                    >
                        {options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                    {labelPosition === 'right' && select.label && (
                        <label
                            {...labelProps}
                            className={labelProps.className}
                            style={labelStyle}
                        >
                            {select.label}
                        </label>
                    )}
                    {addable && selects.length > 1 && (
                        <button type="button" {...buttonProps} {...deleteButtonProps} onClick={() => handleDelete(index)}>
                            {deleteText}
                        </button>
                    )}
                </div>
            ))}
            {addable && (
                <button type="button" {...buttonProps} {...addButtonProps} onClick={handleAdd}>
                    {addText}
                </button>
            )}
        </>
    );
}


/**
 * @function MultiSelect
 * @description - A function component for rendering multiple select elements in a form.
 *      It allows users to manage multiple selections, and supports adding or deleting select elements.
 *      If the addable prop is true, it will render an "Add" button to add new select elements, and each new element will have a "Delete" button.
 *      If the addable prop is false, it will only render the select elements based on the data prop.
 *      The component also supports a callback function that will be called when the value of any select element changes.
 *      The component also supports a label prop that will be rendered as a label element.
 *      The label element can have its own props and can be set to position on the right or left of the selectbox.
 *      By default, the label is set to false and will not be rendered if the user does not set the label.
 *      The label supports an incremental suffix or prefix text based on the active label text shown in the browser.
 *      If the user does not set the incremental text, it will refer to the active label text.
 *      The incremental type can be set to "number" or "alphabetical" and the user can define the prefix/suffix.
 * @param {object} props - The props object.
 * @param {array} [props.data] - An array of objects containing the value and className for each select element.
 *      If not provided, it will render a single select element with an empty value and className.
 * @param {function} [props.onChange] - A callback function that will be called when the value of any select element changes.
 * @param {boolean} [props.addable=false] - If true, allows adding multiple select elements.
 * @param {string} [props.deleteText="Delete"] - The text of the delete button.
 * @param {string} [props.addText="Add"] - The text of the add button.
 * @param {object} [props.wrapperProps={}] - An object with props that will be passed to the wrapper element.
 * @param {object} [props.buttonProps={}] - An object with props that will be passed to all button elements.
 * @param {object} [props.addButtonProps={}] - An object with props that will be passed to the add button element.
 * @param {object} [props.deleteButtonProps={}] - An object with props that will be passed to the delete button element.
 * @param {array} [props.options] - An array of objects containing the value and text for each option in the select element.
 * @param {object} [props.label={}] - An object with props that will be passed to the label element.
 * @param {boolean} [props.label.position="left"] - The position of the label, can be "left" or "right".
 * @param {string} [props.label.text=""] - The text of the label.
 * @param {string} [props.label.incrementalType="number"] - The type of the incremental text, can be "number" or "alphabetical".
 * @param {string} [props.label.incrementalPrefix=""] - The prefix of the incremental text, can be set by user.
 * @param {string} [props.label.incrementalSuffix=""] - The suffix of the incremental text, can be set by user.
 * @example
    <MultiSelect
        data={[
            { value: "option1", className: "select-class", label: "Option 1" },
            { value: "option2", className: "select-class", label: "Option 2" },
        ]}
        options={[
            { value: "option1", text: "Option 1" },
            { value: "option2", text: "Option 2" },
        ]}
        onChange={(event) => console.log(event.target.value)}
        addable={true}
        deleteText="Remove"
        addText="Add More"
        wrapperProps={{ className: "multi-select-wrapper" }}
        buttonProps={{ className: "multi-select-button" }}
        addButtonProps={{ className: "add-button" }}
        deleteButtonProps={{ className: "delete-button" }}
        label={{ 
            position: "right", 
            text: "Choose an option", 
            incrementalType: "alphabetical", 
            incrementalPrefix: true, 
            incrementalSuffix: false 
        }}
    />
 */
export const MultiSelect = ({ 
    data              = [], 
    options           = [], 
    onChange, 
    addable           = false, 
    deleteText        = "Delete", 
    addText           = "Add", 
    wrapperProps      = {}, 
    buttonProps       = {}, 
    addButtonProps    = {}, 
    deleteButtonProps = {}, 
    label             = {}, 
    ...props 
}) => {

    const [selects, setSelects] = React.useState(
        data.length > 0 ? data.map((item) => ({ value: item.value, className: item.className, label: item.label })) : [{ value: '', className: '', label: '' }]
    );

    useEffect(() => {
        setSelects(data.length > 0 ? data.map((item) => ({ value: item.value, className: item.className, label: item.label })) : [{ value: '', className: '', label: '' }]);
    }, [data]);

    /**
     * Handles the change event of a select element.
     * Updates the value of the select element in the state based on the event target's value.
     * Calls the onChange callback function with the updated values.
     * @param {number} index - The index of the select element that changed.
     * @param {object} event - The event object containing the target and value properties.
     */
    const handleChange = (index, event) => {
        const updatedSelects = selects.map((select, i) =>
            i === index ? { ...select, value: event.target.value } : select
        );
        setSelects(updatedSelects);
        if (onChange) {
            onChange(event);
        }
    };
    
    /**
     * Handles the addition of a new select element.
     * If the addable prop is true, creates a new select object with an auto-generated name,
     * an empty value, and a class name based on the first select element's class name.
     * Adds the new select to the existing selects array and calls the onAdd function with the new select.
     * Also handles generating the label for the new select element based on the label prop's incrementalType.
     * If the incrementalType is 'number', the label is generated by incrementing the number in the previous label.
     * If the incrementalType is 'alphabetical', the label is generated by incrementing the alphabetical letter in the previous label.
     * If the incrementalType is 'false', the label is set to the text property of the label prop.
     */
    const handleAdd = () => {
        const firstClassName    = selects.length > 0 ? selects[0].className : '';
        const incrementalType   = label.incrementalType;
        const lastLabel         = data.length > 0 ? data[data.length - 1].label : label.text;

        let newLabel;
        let incrementalPrefix   = label.incrementalPrefix;
        let incrementalSuffix   = label.incrementalSuffix;

        if (false === incrementalType) newLabel = label.text;
        
        if (incrementalPrefix === true) {
            incrementalSuffix = false;
        } else {
            incrementalSuffix = true;
        }

        if (incrementalType === 'number') {
            if (incrementalPrefix === true) {
                newLabel = `${selects.length + 1}${lastLabel.replace(/[0-9]/g, '')}`;
            } else {
                newLabel = `${lastLabel.replace(/[0-9]/g, '')}${selects.length + 1}`;
            }
        } else if (incrementalType === 'alphabetical') {
            const alphaNext = AlphaNext();
            let nextLoop = 0;
            for (let i = 0; i < selects.length; i++) {
                nextLoop = selects.length + 1;
                alphaNext(nextLoop);
            }
            
            if (incrementalPrefix === true) {
                newLabel = alphaNext(nextLoop) + ` ${lastLabel.replace(/[0-9]/g, '')}`;
            } else {
                newLabel = `${lastLabel.replace(/[0-9]/g, '')} ` + alphaNext(nextLoop);
            }
        } else {
            newLabel = label.text;
        }
        
        setSelects([...selects, { value: '', className: firstClassName, label: newLabel }]);
    };

    /**
     * Handles the delete button click event.
     * Deletes the select element at the given index from the state.
     * @param {number} index - The index of the select element to delete.
     */
    const handleDelete = (index) => {
        setSelects(selects.filter((_, i) => i !== index));
    };

    return (
        <>
            {selects.map((select, index) => (
                <div key={index} {...wrapperProps}>
                    {label.position === 'left' && select.label && (
                        <label
                            className={label.className}
                            style={label.style}
                        >
                            {select.label}
                        </label>
                    )}
                    <select
                        name={`${props.name}[${index}]`}
                        value={select.value}
                        onChange={(event) => handleChange(index, event)}
                        className={select.className}
                    >
                        {options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                    {label.position === 'right' && select.label && (
                        <label
                            className={label.className}
                            style={label.style}
                        >
                            {select.label}
                        </label>
                    )}
                    {addable && selects.length > 1 && (
                        <button type="button" {...buttonProps} {...deleteButtonProps} onClick={() => handleDelete(index)}>
                            {deleteText}
                        </button>
                    )}
                </div>
            ))}
            {addable && (
                <button type="button" {...buttonProps} {...addButtonProps} onClick={handleAdd}>
                    {addText}
                </button>
            )}
        </>
    );
};