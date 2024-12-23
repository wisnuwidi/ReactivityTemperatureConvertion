/**
 * @filename        : Check.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 30-10-2024, 00:00:43
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering checkbox elements in a form.
 *                    It supports managing the state of multiple checkbox elements and allows adding new checkbox elements dynamically.
 */

import React, { useState, useEffect } from 'react';
import { FindDuplicateArrayValue, NextIncrement } from '../../Helper/ConstantMotion';
import Label from './Label';

/**
 * @function Check
 * 
 * @description
 *      A function component for rendering multiple checkbox elements in a form.
 *      It manages the state of each checkbox based on the provided data.
 *      The user can also set the ability to add new checkbox elements.
 *      The user can also set the minimum number of delete buttons to be shown.
 * 
 * @param {object} props - The props object.
 * @param {array} [props.data] - An array of objects containing the name, value, and className for each checkbox element.
 *      - If not provided, it will render a single checkbox element with an empty name, value, and className.
 * @param {function} [props.onChange] - The function that will be called whenever the value of any checkbox element changes.
 *      - It receives an object with the current values of all checkbox elements.
 * @param {object} [props.wrapper] - An object containing the tag name and props for the wrapper element.
 *      - The tag name is the type of the wrapper element.
 *      - The props is an object containing the props that will be passed to the wrapper element.
 * @param {boolean} [props.addable=false] - If true, the component will render a button for adding a new checkbox element.
 *      - If the component was created with `addable` set to true, the button for adding a new checkbox element will be enabled.
 *      - If the button is clicked, the component will create a new checkbox element and append it to the checkbox elements array.
 * @param {string} [props.addText="Add"] - The text content of the button for adding a new checkbox element.
 * @param {function} [props.onAdd] - The function that will be called when the user clicks the button for adding a new checkbox element.
 *      - It receives the new checkbox element as an argument.
 * @param {number} [props.minDeleteButton=0] - The minimum number of delete buttons to be shown.
 *      - If the number of delete buttons reaches this number, the delete button will be destroyed.
 * @param {string} [props.deleteText="Delete"] - The text content of the button for deleting a checkbox element.
 * @param {function} [props.onDelete] - The function that will be called when the user clicks the button for deleting a checkbox element.
 *      - It receives the checkbox element that was deleted as an argument.
 * @param {object} [props.wrapperProps] - An object containing the props that will be passed to the wrapper element.
 *      - If not provided, the wrapper element will not have any props.
 * @param {array} [props.wrapperClass] - An array of strings containing the class names for the wrapper element.
 *      - If not provided, the wrapper element will not have any class names.
 * 
 * @example
 *  <Check
        data={[
            {
                name: "namasama",
                id: "idbeda", 
                label: { 
                    text: "Input your option", 
                    className: "input-label", 
                    position:"left",
                    increments: {
                        type: "number",
                        prefix: true,
                        suffix: true
                    } 
                },
                className: "custom-input",
                placeholder: "Please input",
                value: [],
                required: true
            }, {
                name: "namabeda",
                id: "idsama", 
                label: { 
                    text: "Input your option", 
                    className: "input-label", 
                    position:"left",
                    increments: {
                        type: "alphabetical",
                        prefix: false,
                        suffix: true
                    } 
                },
                className: "custom-input",
                placeholder: "Please input",
                value: ["input text 1", "input text 2"],
                required: true
            }, {
                name: "namasama",
                id: "idsama", 
                label: { 
                    text: "Input your option", 
                    className: "input-label", 
                    position:"right",
                    increments: {
                        type: "alphabetical",
                        prefix: true,
                        suffix: true
                    } 
                },
                className: "custom-input",
                placeholder: "Please input",
                value: ["input text 1", "input text 2"],
                required: true
            }
        ]}
        addable={{
            status: true,
            inputProps: {
                name: "namabeda",
                id: "idsama",
                className: "custom-input",
                placeholder: "Please input"
            },
            label: {
                text: "Add new input",
                className: "input-label",
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
                id: "add-input-button",
                className: "custom-button",
                name: "add-input",
                style: {
                    marginLeft: "10px"
                }
            },
            deleteButton: {
                text: "Delete"
            },
            deleteOnlyAdded: false,
            minButtonLeft: 1
        }}
        wrapper={{
            tag: "article",
            className: "custom-wrapper",
            style: {
                display: "flex"
            }
        }}
        onChange={(event) => ''}//console.log(event.target.value)}
    />
 */
export const Check = ({ data = [], onChange, wrapper = [], addable = {}, ...props }) => {
    const [inputs, setInputs] = useState(() => FindDuplicateArrayValue(data, ['name', 'id'], ''));
    const [inputValues, setInputValues] = useState(() => inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.checked || false }), {}));

    useEffect(() => {
        const updatedInputs = FindDuplicateArrayValue(data, ['name', 'id'], '');
        if (JSON.stringify(inputs) !== JSON.stringify(updatedInputs)) {
            setInputs(updatedInputs);
            setInputValues(updatedInputs.reduce((acc, input) => ({ ...acc, [input.name]: input.checked || false }), {}));
        }
    }, [data, addable]);

    const WrapperTag = wrapper?.tag || 'div';

    const handleChange = (index, event) => {
        const updatedInputs = inputs.map((input, i) =>
            i === index ? { ...input, checked: event.target.checked } : input
        );
        setInputs(updatedInputs);
        setInputValues(updatedInputs.reduce((acc, input) => ({ ...acc, [input.name]: input.checked || false }), {}));
        if (onChange) {
            onChange(event);
        }
    };

    const { prefix, suffix } = addable.label?.increments || {};
    const position = prefix && suffix ? 'prefix|suffix' : prefix ? 'prefix' : suffix ? 'suffix' : false;
    const getNextLabel = (baseLabel, index, increments, position) => NextIncrement(index, increments, baseLabel, position);

    const [lastAddedElement, setLastAddedElement] = useState(null);

    const handleAddInput = () => {
        const lastElementIndex = inputs.length - 1;
        const lastAddedElementName = lastAddedElement?.name || inputs[lastElementIndex]?.name || '';
        const lastAddedElementId = lastAddedElement?.id || inputs[lastElementIndex]?.id || '';

        if (addable.status) {
            const newInputName = `${addable.inputProps.name}[${lastAddedElementName.match(/\[(\d+)\]/) ? Number(lastAddedElementName.match(/\[(\d+)\]/)[1]) + 1 : 0}]`;
            const newInputId = `${addable.inputProps.id}[${lastAddedElementId.match(/\[(\d+)\]/) ? Number(lastAddedElementId.match(/\[(\d+)\]/)[1]) + 1 : 0}]`;

            let countElements = inputs.length - data.length;
            data.forEach((item, index) => {
                if (item.name === addable.inputProps.name) data[index].name = `${data[index].name}[${countElements}]`;
                if (item.id === addable.inputProps.id) data[index].id = `${data[index].id}[${countElements}]`;
            });

            const newInput = {
                ...addable.inputProps,
                name: newInputName,
                id: newInputId,
                checked: false,
                label: {
                    text: getNextLabel(addable.label?.text || '', inputs.length, addable.label?.increments || '', position),
                    ...addable.label.inputProps,
                },
            };

            setLastAddedElement(newInput);
            setInputs([...inputs, newInput]);
            setInputValues(prevValues => ({ ...prevValues, [newInputName]: false }));
        }
    };

    const [deletedElementInfo, setDeletedElementInfo] = useState(null);
    const handleDeleteInput = (index) => {
        const deletedElement = inputs[index];
        const deletedElementInfo = {
            index: index,
            id: deletedElement.id,
            name: deletedElement.name,
        };

        const nameIncrement = deletedElement.name.match(/\[(\d+)\]/);
        const idIncrement = deletedElement.id.match(/\[(\d+)\]/);

        if (nameIncrement && idIncrement) {
            deletedElementInfo.nameIncrement = parseInt(nameIncrement[1], 10);
            deletedElementInfo.idIncrement = parseInt(idIncrement[1], 10);
        }

        setDeletedElementInfo(deletedElementInfo);

        if (inputs.length > (addable.minButtonLeft || 0) && (!addable.deleteOnlyAdded || inputs[index].name !== (data[index] || {}).name)) {
            const updatedInputs = inputs.filter((_, i) => i !== index);
            setInputs(updatedInputs);
            setInputValues(updatedInputs.reduce((acc, input) => ({ ...acc, [input.name]: input.checked || false }), {}));
        }
    };

    return (
        <>
            {inputs.map((input, index) => (
                <WrapperTag key={index} {...wrapper}>
                    {input.label && (!input.label?.position || input.label?.position === 'left') && (
                        <Label
                            text={input.label.text}
                            htmlFor={input.id}
                            increments={input.label.increments}
                            position={input.label.position}
                            {...input.label.props}
                        />
                    )}
                    <input
                        type="checkbox"
                        name={input.name}
                        id={input.id}
                        className={input.className}
                        checked={inputValues[input.name] || false}
                        onChange={event => handleChange(index, event)}
                        {...input.props}
                    />
                    {input.label && input.label?.position === 'right' && (
                        <Label
                            text={input.label.text}
                            htmlFor={input.id}
                            increments={input.label.increments}
                            position={input.label.position}
                            {...input.label.props}
                        />
                    )}
                    {addable.status && inputs.length > (addable.minButtonLeft || 0) && (!addable.deleteOnlyAdded || inputs[index].name !== (data[index] || {}).name) && (
                        <button {...addable.deleteButton} onClick={() => handleDeleteInput(index)}>{addable.deleteButton?.text || "Delete"}</button>
                    )}
                </WrapperTag>
            ))}
            {addable.status && (
                <button {...addable.button} onClick={handleAddInput}>{addable.button?.text || "Add"}</button>
            )}
        </>
    );
};
