/**
 * @filename        : Radio.js
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 30-10-2024, 00:12:16
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering radio elements in a form.
 *                    It supports managing the state of multiple radio elements and allows adding new radio elements dynamically.
 */

import React, { useState, useEffect } from 'react';
import { FindDuplicateArrayValue, NextIncrement } from '../../Helper/ConstantMotion';
import Label from './Label';

/**
 * @function Radio
 * 
 * @description
 *      A function component for rendering multiple radio elements in a form.
 *      It manages the state of each radio based on the provided data.
 *      The user can also set the ability to add new radio elements.
 *      The user can also set the minimum number of delete buttons to be shown.
 * 
 * @param {object} props - The props object.
 * @param {array} [props.data] - An array of objects containing the name, value, and className for each radio element.
 *      - If not provided, it will render a single radio element with an empty name, value, and className.
 * @param {function} [props.onChange] - The function that will be called whenever the value of any radio element changes.
 *      - It receives an object with the current values of all radios.
 * @param {object} [props.wrapper] - An object containing the tag name and props for the wrapper element.
 *      - The tag name is the type of the wrapper element.
 *      - The props is an object containing the props that will be passed to the wrapper element.
 * @param {boolean} [props.addable=false] - If true, the component will render a button for adding a new radio element.
 *      - If the component was created with `addable` set to true, the button for adding a new radio element will be enabled.
 *      - If the button is clicked, the component will create a new radio element and append it to the radio elements array.
 * @param {string} [props.addText="Add"] - The text content of the button for adding a new radio element.
 * @param {function} [props.onAdd] - The function that will be called when the user clicks the button for adding a new radio element.
 *      - It receives the new radio element as an argument.
 * @param {number} [props.minDeleteButton=0] - The minimum number of delete buttons to be shown.
 *      - If the number of delete buttons reaches this number, the delete button will be destroyed.
 * @param {string} [props.deleteText="Delete"] - The text content of the button for deleting a radio element.
 * @param {function} [props.onDelete] - The function that will be called when the user clicks the button for deleting a radio element.
 *      - It receives the radio element that was deleted as an argument.
 * @param {object} [props.wrapperProps] - An object containing the props that will be passed to the wrapper element.
 *      - If not provided, the wrapper element will not have any props.
 * @param {array} [props.wrapperClass] - An array of strings containing the class names for the wrapper element.
 *      - If not provided, the wrapper element will not have any class names.
 * 
 * @example
 *  <Radio
        data={[
            {
                name: "namasama",
                id: "idbeda", 
                label: { 
                    text: "Select your option", 
                    className: "radio-label", 
                    position:"left",
                    increments: {
                        type: "number",
                        prefix: true,
                        suffix: true
                    } 
                },
                className: "custom-radio",
                value: "option1",
                required: true
            }, {
                name: "namabeda",
                id: "idsama", 
                label: { 
                    text: "Select your option", 
                    className: "radio-label", 
                    position:"left",
                    increments: {
                        type: "alphabetical",
                        prefix: false,
                        suffix: true
                    } 
                },
                className: "custom-radio",
                value: "option2",
                required: true
            }
        ]}
        addable={{
            status: true,
            radioProps: {
                name: "namabeda",
                id: "idsama",
                className: "custom-radio"
            },
            label: {
                text: "Add new radio",
                className: "radio-label",
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
                id: "add-radio-button",
                className: "custom-button",
                name: "add-radio",
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
export const Radio = ({ data = [], onChange, wrapper = [], addable = {}, ...props }) => {
    const [radios, setRadios] = useState(() => FindDuplicateArrayValue(data, ['name', 'id'], ''));
    const [radioValues, setRadioValues] = useState(() => radios.reduce((acc, radio) => ({ ...acc, [radio.name]: radio.value || '' }), {}));

    useEffect(() => {
        const updatedRadios = FindDuplicateArrayValue(data, ['name', 'id'], '');
        setRadios(updatedRadios);
        setRadioValues(updatedRadios.reduce((acc, radio) => ({ ...acc, [radio.name]: radio.value || '' }), {}));
    }, [data, addable]);

    const WrapperTag = wrapper?.tag || 'div';

    const handleChange = (index, event) => {
        const updatedRadios = radios.map((radio, i) =>
            i === index ? { ...radio, value: event.target.value } : radio
        );
        setRadios(updatedRadios);
        setRadioValues(updatedRadios.reduce((acc, radio) => ({ ...acc, [radio.name]: radio.value || '' }), {}));
        if (onChange) {
            onChange(event);
        }
    };

    const { prefix, suffix } = addable.label?.increments || {};
    const position = prefix && suffix ? 'prefix|suffix' : prefix ? 'prefix' : suffix ? 'suffix' : false;
    const getNextLabel = (baseLabel, index, increments, position) => NextIncrement(index, increments, baseLabel, position);

    const [lastAddedElement, setLastAddedElement] = useState(null);

    const handleAddRadio = () => {
        const lastElementIndex = radios.length - 1;
        const lastAddedElementId = lastAddedElement?.id || radios[lastElementIndex]?.id || '';

        if (addable.status) {
            const newRadioName = addable?.radioProps?.name || addable.name || radios[0]?.name || '';
            const newRadioId = `${addable?.radioProps?.id || addable.id}[${lastAddedElementId.match(/\[(\d+)\]/) ? Number(lastAddedElementId.match(/\[(\d+)\]/)[1]) + 1 : 0}]`;

            let countElements = radios.length - data.length;
            data.forEach((item, index) => {
                if (item.id === addable?.radioProps?.id || item.id === addable.id) data[index].id = `${data[index].id}[${countElements}]`;
            });

            const newRadio = {
                ...addable?.radioProps || {},
                name: newRadioName,
                id: newRadioId,
                value: '',
                label: {
                    text: getNextLabel(addable.label?.text || '', radios.length, addable.label?.increments || '', position),
                    ...addable.label.props,
                },
            };

            setLastAddedElement(newRadio);
            setRadios([...radios, newRadio]);
            setRadioValues(prevValues => ({ ...prevValues, [newRadioId]: '' }));
        }
    };

    const [deletedElementInfo, setDeletedElementInfo] = useState(null);
    const handleDeleteRadio = (index) => {
        const deletedElement = radios[index];
        const deletedElementInfo = {
            index: index,
            id: deletedElement.id,
        };

        const idIncrement = deletedElement.id.match(/\[(\d+)\]/);

        if (idIncrement) {
            deletedElementInfo.idIncrement = parseInt(idIncrement[1], 10);
        }

        setDeletedElementInfo(deletedElementInfo);

        if (radios.length > (addable.minButtonLeft || 0) && (!addable.deleteOnlyAdded || radios[index].id !== (data[index] || {}).id)) {
            const updatedRadios = radios.filter((_, i) => i !== index);
            setRadios(updatedRadios);
            setRadioValues(updatedRadios.reduce((acc, radio) => ({ ...acc, [radio.name]: radio.value || '' }), {}));
        }
    };

    return (
        <>
            {radios.map((radio, index) => (
                <WrapperTag key={index} {...wrapper}>
                    {radio.label && (!radio.label?.position || radio.label?.position === 'left') && (
                        <Label
                            text={radio.label.text}
                            htmlFor={radio.id}
                            increments={radio.label.increments}
                            position={radio.label.position}
                            {...radio.label.props}
                        />
                    )}
                    <input
                        type="radio"
                        name={radio.name}
                        id={radio.id}
                        className={radio.className}
                        value={radioValues[radio.name] || ''}
                        onChange={event => handleChange(index, event)}
                        {...radio.props}
                    />
                    {radio.label && radio.label?.position === 'right' && (
                        <Label
                            text={radio.label.text}
                            htmlFor={radio.id}
                            increments={radio.label.increments}
                            position={radio.label.position}
                            {...radio.label.props}
                        />
                    )}
                    {radios.length > (addable.minButtonLeft || 0) && (!addable.deleteOnlyAdded || radios[index].name !== (data[index] || {}).name) && (
                        <button {...addable.deleteButton} onClick={() => handleDeleteRadio(index)}>{addable.deleteButton?.text || "Delete"}</button>
                    )}
                </WrapperTag>
            ))}
            {addable.status && (
                <button {...addable.button} onClick={handleAddRadio}>{addable.button?.text || "Add"}</button>
            )}
        </>
    );
};
