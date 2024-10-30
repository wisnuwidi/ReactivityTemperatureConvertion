/**
 * @filename        : Select.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 23-10-2024, 21:41:19
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a React function component for rendering single or multiple select elements in a form. It supports dynamic addition and deletion of select elements and manages their state efficiently.
 */

import React, { useState, useEffect } from 'react';
import { FindDuplicateArrayValue, NextIncrement } from '../../Helper/ConstantMotion';
import Label from '../FormElement/Label';

/**
 * @function Select
 * 
 * @description
 *      A function component for rendering a single or multiple select elements in a form.
 *      The user can pass an array of objects containing the name, id, options, and className for each select element.
 *      The component will render a label element with the provided text and position for each select element.
 *      The user can also set the ability to add new select elements.
 *      The user can also set the minimum number of delete buttons to be shown.
 *      The component will call the provided onChange function whenever the value of any select element changes.
 *      The component will call the provided onAdd function whenever the user clicks the button for adding a new select element.
 *      The component will call the provided onDelete function whenever the user clicks the button for deleting a select element.
 * 
 * @param {object} props - The props object.
 *      - This object can contain the following properties:
 *          - data: An array of objects containing the name, id, options, and className for each select element.
 *              - If not provided, the component will render a single select element with an empty name, id, options, and className.
 *          - onChange: The function that will be called whenever the value of any select element changes.
 *              - It receives an object with the current values of all select elements.
 *          - addable: A boolean indicating whether the component should render a button for adding a new select element.
 *              - If true, the component will render a button for adding a new select element.
 *              - If false, the component will not render a button for adding a new select element.
 *              - Default: false
 *          - onAdd: The function that will be called when the user clicks the button for adding a new select element.
 *              - It receives the new select element as an argument.
 *          - onDelete: The function that will be called when the user clicks the button for deleting a select element.
 *              - It receives the select element that was deleted as an argument.
 *          - minDeleteButton: The minimum number of delete buttons to be shown.
 *              - If the number of delete buttons reaches this number, the delete button will be destroyed.
 *              - If the number of delete buttons is less than this number, the delete button will be shown again.
 *              - Default: 0
 *          - wrapperProps: An object with key-value pairs for the wrapper element that will be used to wrap the select elements.
 *              - If not provided, the component will use the default div tag.
 *
 * @param {array} [props.data] - An array of objects containing the properties for each select element.
 *      - If not provided, the component will render a single select element with default values for all properties.
 *      - Each object in the array can contain the following properties:
 *          - name: {string} The name of the select element.
 *              - If not provided, the component will use the default name which is "select-<index>" where <index> is the index of the select element in the array.
 *          - id: {string} The id of the select element.
 *              - If not provided, the component will use the default id which is "select-<index>" where <index> is the index of the select element in the array.
 *          - options: {array} An array of objects containing the value and text for each option in the select element.
 *              - If not provided, the component will render a single option with an empty value and text.
 *              - Each object in the array can contain the following properties:
 *                  - value: {string} The value of the option.
 *                  - text: {string} The text of the option.
 *          - className: {string} The class name of the select element.
 *              - If not provided, the component will use the default class name which is "select-element".
 * 
 * @param {function} [props.onChange] - The function that will be called whenever the value of any select element changes.
 *      - It receives an object with the following properties:
 *          - `name`: {string} The name of the select element that was changed.
 *          - `value`: {string} The new value of the select element.
 *          - `index`: {number} The index of the select element in the array of select elements.
 *          - `options`: {array} The array of options for the select element.
 *              - Each object in the array can contain the following properties:
 *                  - `value`: {string} The value of the option.
 *                  - `text`: {string} The text of the option.
 *          - `event`: {object} The event object of the change event.
 * 
 * @param {boolean|object} [props.addable=false] - Determines whether the component should allow adding new select elements.
 *      - If set to `false`, the component will not render the button for adding new select elements.
 *      - If set to `true`, the component will render a default button for adding new select elements.
 *      - If an object is provided, it allows customization of the add feature with the following properties:
 *          - button: {object} Configuration for the add button.
 *              - text: {string} The text displayed on the add button.
 *                  - Default: "Add"
 *              - className: {string} The class name applied to the add button for styling.
 *                  - Default: "add-button"
 *              - disabled: {boolean} Whether the add button should be disabled.
 *                  - Default: false
 *              - icon: {string} An optional icon to display alongside the button text.
 *          - onAddCallback: {function} A custom callback function that executes when the add button is clicked.
 *              - It receives the new select element as an argument.
 *          - initialSelect: {object} The initial configuration for the new select element to be added.
 *              - name: {string} The name of the new select element.
 *                  - Default: "select-new"
 *              - id: {string} The id of the new select element.
 *                  - Default: "select-new-id"
 *              - options: {array} An array of option objects for the new select element.
 *                  - Each option object can have:
 *                      - value: {string} The value of the option.
 *                      - text: {string} The text displayed for the option.
 *              - className: {string} The class name for styling the new select element.
 *                  - Default: "select-element"
 * 
 * @param {string|object} [props.addText="Add"] - The text content of the button for adding a new select element. If an object is provided, it allows customization of the add button with the following properties:
 *      - text: {string} The text displayed on the add button.
 *          - Default: "Add"
 *      - className: {string} The class name applied to the add button for styling.
 *          - Default: "add-button"
 *      - disabled: {boolean} Whether the add button should be disabled.
 *          - Default: false
 *      - icon: {string} An optional icon to display alongside the button text.
 * 
 * @param {function} [props.onAdd] - A callback function that is triggered when the add button is clicked to create a new select element.
 *      - The function receives an object representing the newly added select element containing the following properties:
 *          - `name`: {string} The name assigned to the new select element.
 *              - Default: A generated name based on existing select elements.
 *          - `id`: {string} The id assigned to the new select element.
 *              - Default: A generated id based on existing select elements.
 *          - `options`: {array} An array of option objects for the new select element.
 *              - Each option object can have:
 *                  - `value`: {string} The value for the option.
 *                  - `text`: {string} The text displayed for the option.
 *          - `className`: {string} The CSS class name applied to the new select element for styling.
 *              - Default: "select-element"
 *          - `placeholder`: {string} An optional placeholder text for the select element.
 *              - Default: None
 *          - `label`: {object} An optional label configuration for the new select element.
 *              - `text`: {string} The text of the label.
 *                  - Default: None
 *              - `className`: {string} The CSS class name applied to the label for styling.
 *                  - Default: None
 *              - `position`: {string} Determines the position of the label relative to the select element.
 *                  - Options: "left", "right", "top", "bottom"
 *                  - Default: "left"
 *              - `increments`: {boolean} Whether to increment the label text with the index of the select element.
 *                  - Default: false
 * 
 * @param {function} [props.onDelete] - A callback function triggered when the delete button for a select element is clicked.
 *      - This function receives an object representing the deleted select element with the following properties:
 *          - `name`: {string} The name of the deleted select element.
 *          - `id`: {string} The unique identifier of the deleted select element.
 *          - `options`: {array} An array of option objects that were present in the deleted select element.
 *              - Each option object contains:
 *                  - `value`: {string} The value of the option.
 *                  - `text`: {string} The display text of the option.
 *          - `className`: {string} The CSS class name applied to the deleted select element.
 *          - `placeholder`: {string} The placeholder text that was used in the deleted select element, if any.
 *          - `label`: {object} The label configuration associated with the deleted select element.
 *              - `text`: {string} The text of the label.
 *              - `className`: {string} The CSS class name applied to the label.
 *              - `position`: {string} The position of the label relative to the select element.
 *                  - Possible values include "left", "right", "top", "bottom".
 *              - `increments`: {boolean} Indicates whether the label text was incremented with the index of the select element.
 * 
 * @param {string|object} [props.deleteText="Delete"] - The text content of the button for deleting a select element or an object to customize the delete button.
 *      - If an object is provided, it can contain the following properties to customize the delete button:
 *          - `text`: {string} The text displayed on the delete button.
 *              - Default: "Delete"
 *          - `className`: {string} The class name applied to the delete button for styling.
 *              - Default: "delete-button"
 *          - `disabled`: {boolean} Whether the delete button should be disabled.
 *              - Default: false
 *          - `icon`: {string} An optional icon to display alongside the button text.
 *          - `onClick`: {function} A custom callback function that is triggered when the delete button is clicked.
 *              - The function receives an object representing the select element to be deleted as an argument, with the following properties:
 *                  - `name`: {string} The name of the select element.
 *                  - `id`: {string} The unique identifier of the select element.
 *                  - `options`: {array} An array of option objects present in the select element.
 *                      - Each option object contains:
 *                          - `value`: {string} The value of the option.
 *                          - `text`: {string} The display text of the option.
 *                  - `className`: {string} The CSS class name applied to the select element.
 *                  - `placeholder`: {string} The placeholder text that is used in the select element, if any.
 *                  - `label`: {object} The label configuration associated with the select element.
 *                      - `text`: {string} The text of the label.
 *                      - `className`: {string} The CSS class name applied to the label.
 *                      - `position`: {string} The position of the label relative to the select element.
 *                          - Possible values include "left", "right", "top", "bottom".
 *                      - `increments`: {boolean} Indicates whether the label text was incremented with the index of the select element.
 * 
 * @param {object} [props.wrapperProps] - The props of the wrapper element that will be used to wrap the select elements.
 *      - If not provided, the component will use the default div tag.
 *      - The following sub-props can be used to customize the wrapper element:
 *          - `tagName`: {string} The tag name of the wrapper element.
 *              - Default: "div"
 *          - `style`: {object} The CSS styles to be applied to the wrapper element.
 *              - Example: { backgroundColor: "white", padding: "10px" }
 *          - `className`: {string} The CSS class name to be applied to the wrapper element.
 *              - Example: "custom-wrapper"
 *          - `id`: {string} The unique identifier of the wrapper element.
 *              - Example: "wrapper-id"
 *          - `onClick`: {function} A custom callback function that is triggered when the wrapper element is clicked.
 *              - The function receives the event object as an argument.
 *          - `onMouseOver`: {function} A custom callback function that is triggered when the mouse is over the wrapper element.
 *              - The function receives the event object as an argument.
 *          - `onMouseOut`: {function} A custom callback function that is triggered when the mouse is out of the wrapper element.
 *              - The function receives the event object as an argument.
 *          - `onTouchStart`: {function} A custom callback function that is triggered when the touch event is started on the wrapper element.
 *              - The function receives the event object as an argument.
 *          - `onTouchEnd`: {function} A custom callback function that is triggered when the touch event is ended on the wrapper element.
 *              - The function receives the event object as an argument.
 *          - `onTouchMove`: {function} A custom callback function that is triggered when the touch event is moved on the wrapper element.
 *              - The function receives the event object as an argument.
 * 
 * @param {object} [props.minDeleteButton] - The configuration object for the minimum number of delete buttons to be shown.
 *      - If the number of delete buttons reaches this number, the delete button will be destroyed.
 *      - If the number of delete buttons is less than this number, the delete button will be shown again.
 *      - The following sub-props can be used to customize the minimum number of delete buttons:
 *          - `value`: {number} The minimum number of delete buttons to be shown.
 *              - Default: 0
 *          - `style`: {object} The CSS styles to be applied to the delete button.
 *              - Example: { backgroundColor: "red", padding: "10px" }
 *          - `className`: {string} The CSS class name to be applied to the delete button.
 *              - Example: "custom-delete-button"
 *          - `id`: {string} The unique identifier of the delete button.
 *              - Example: "delete-button-id"
 *          - `onClick`: {function} A custom callback function that is triggered when the delete button is clicked.
 *              - The function receives the event object as an argument.
 *          - `onMouseOver`: {function} A custom callback function that is triggered when the mouse is over the delete button.
 *              - The function receives the event object as an argument.
 *          - `onMouseOut`: {function} A custom callback function that is triggered when the mouse is out of the delete button.
 *              - The function receives the event object as an argument.
 *          - `onTouchStart`: {function} A custom callback function that is triggered when the touch event is started on the delete button.
 *              - The function receives the event object as an argument.
 *          - `onTouchEnd`: {function} A custom callback function that is triggered when the touch event is ended on the delete button.
 *              - The function receives the event object as an argument.
 *          - `onTouchMove`: {function} A custom callback function that is triggered when the touch event is moved on the delete button.
 *              - The function receives the event object as an argument.
 * 
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
    
    /**
     * Handles the change event of a select element.
     * Updates the value of the select element in the state based on the event target's name and value.
     * Calls the onChange callback function with the event.
     * @param {number} index - The index of the select element that changed.
     * @param {object} event - The event object.
     */
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
    
    const [lastAddedElement, setLastAddedElement] = useState(null);
    /**
     * Handles the addition of a new select element when the add button is clicked.
     * If the addable prop is true, it will create a new select element with an incremented name and id.
     * If the addable prop is false and the selects array is not empty, it will create a new select element with the same name and id as the last element in the selects array.
     * If the addable prop is false and the selects array is empty, it will create a new select element with the same name and id as the data array if it is not empty.
     * If the addable prop is false and the selects array is empty and the data array is empty, it will create a new select element with a default name and id.
     * It will then update the selects state with the new select element.
     */
    const handleAddSelect = () => {
        const lastElementIndex = selects.length - 1;
        const lastAddedElementName = lastAddedElement?.name || selects[lastElementIndex]?.name || '';
        const lastAddedElementId   = lastAddedElement?.id || selects[lastElementIndex]?.id || '';

        if (addable.status) {
            const newSelectName = `${addable.selectProps.name}[${lastAddedElementName.match(/\[(\d+)\]/) ? Number(lastAddedElementName.match(/\[(\d+)\]/)[1]) + 1 : 0}]`;
            const newSelectId   = `${addable.selectProps.id}[${lastAddedElementId.match(/\[(\d+)\]/) ? Number(lastAddedElementId.match(/\[(\d+)\]/)[1]) + 1 : 0}]`;

            // Add The Incremental Bracket For Duplicate Name And ID For The Un-Bracketed First Element Found In The Selects Array
            let countElements   = selects.length - data.length;
            data.map((item, index) => {
                if (item.name === addable.selectProps.name) data[index].name = `${data[index].name}[${countElements}]`;
                if (item.id   === addable.selectProps.id)   data[index].id   = `${data[index].id}[${countElements}]`;
            })

            const newSelect = {
                ...addable.selectProps,
                name     : newSelectName,
                id       : newSelectId,
                options  : addable?.selectProps?.options || [],
                value    : '',
                label    : {
                    text : getNextLabel(addable.label?.text || '', selects.length, addable.label?.increments? addable.label?.increments : '', position),
                    ...addable.label.selectProps
                }
            };

            setLastAddedElement(newSelect);
            setSelects([...selects, newSelect]);
        }
    };

    const [deletedElementInfo, setDeletedElementInfo] = useState(null);
    /**
     * Handles the deletion of a select element.
     * If the element has the same id and name as the data[index], it will be removed from the selects array.
     * If the element was added by the user, it will be removed from the selects array.
     * If the element is the last one, and the addable.minButtonLeft is set to 0, it will be removed from the selects array.
     * If the element is not the last one, it will be removed from the selects array, and the selected values will be updated.
     * @param {number} index - The index of the element to be deleted.
     */
    const handleDeleteSelect = (index) => {
        const deletedElement = selects[index];
        const deletedElementInfo = {
            index: index,
            id: deletedElement.id,
            name: deletedElement.name,
        };

        const nameIncrement = deletedElement.name.match(/\[(\d+)\]/);
        const idIncrement   = deletedElement.id.match(/\[(\d+)\]/);

        if (nameIncrement && idIncrement) {
            deletedElementInfo.nameIncrement = parseInt(nameIncrement[1], 10);
            deletedElementInfo.idIncrement   = parseInt(idIncrement[1], 10);
        }

        setDeletedElementInfo(deletedElementInfo);

        if (selects.length > (addable.minButtonLeft || 0) && (!addable.deleteOnlyAdded || selects[index].name !== (data[index] || {}).name)) {
            const updatedSelects = selects.filter((_, i) => i !== index);
            setSelects(updatedSelects);
            setSelectedValues(updatedSelects.reduce((acc, select) => {
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
