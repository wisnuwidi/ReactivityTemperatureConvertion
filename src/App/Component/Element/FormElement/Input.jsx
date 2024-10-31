/**
 * @filename        : Input.jsx
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 23-10-2024, 21:43:19
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering input elements in a form.
 *                    It supports managing the state of multiple input elements and allows adding new inputs dynamically.
 */

import React, { useState, useEffect } from 'react';
import { FindDuplicateArrayValue, NextIncrement } from '../../Helper/ConstantMotion';
import Label from '../FormElement/Label';

/**
 * @function Input
 * 
 * @description
 *      A function component for rendering input elements in a form.
 *      It supports managing the state of multiple input elements and allows adding new inputs dynamically.
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
 *      - If not provided, it will use the default deleteText.
 * @param {function} [props.onDelete] - The function that will be called when the user clicks the button for deleting a checkbox element.
 *      - It receives the checkbox element that was deleted as an argument.
 * @param {object} [props.wrapperProps] - An object containing the props that will be passed to the wrapper element.
 *      - The props is an object containing the props that will be passed to the wrapper element.
 * @param {object} [props.addable.inputProps] - An object containing the props that will be passed to the new input element.
 *      - The props is an object containing the props that will be passed to the new input element.
 * @param {object} [props.addable.label] - An object containing the props for the labels of the new input element.
 *      - The object contains two properties: left and right.
 *      - The left property is an object containing the props for the left label of the new input element.
 *      - The right property is an object containing the props for the right label of the new input element.
 * @param {boolean} [props.addable.deleteOnlyAdded=false] - If true, the delete button will only be shown for the added elements.
 *      - If false, the delete button will be shown for all elements.
 * @param {number} [props.addable.minButtonLeft=0] - The minimum number of delete buttons to be shown.
 *      - If the number of delete buttons reaches this number, the delete button will be destroyed.
 * @param {object} [props.addable.deleteButton] - An object containing the props for the delete button.
 *      - The props is an object containing the props that will be passed to the delete button.
 * @param {string} [props.addable.deleteButton.text="Delete"] - The text content of the delete button.
 *      - If not provided, it will use the default deleteText.
 * @param {function} [props.addable.onDelete] - The function that will be called when the user clicks the delete button.
 *      - It receives the element that was deleted as an argument.
 * @param {object} [props.addable.button] - An object containing the props for the add button.
 *      - The props is an object containing the props that will be passed to the add button.
 * @param {string} [props.addable.button.text="Add"] - The text content of the add button.
 *      - If not provided, it will use the default addText.
 * @param {function} [props.addable.onAdd] - The function that will be called when the user clicks the add button.
 *      - It receives the new element as an argument.
 * @example
 *      import React from 'react';
 *      import { Input } from 'react-input-element';
 *      
 *      const data = [
 *          { name: 'name', value: 'John Doe', className: 'input-1' },
 *          { name: 'age', value: 18, className: 'input-2' },
 *          { name: 'email', value: 'john.doe@example.com', className: 'input-3' },
 *      ];
 *      
 *      const App = () => {
 *          const [inputs, setInputs] = React.useState(data);
 *          
 *          const handleAddInput = () => {
 *              const newInput = {
 *                  name: 'address',
 *                  value: '',
 *                  className: 'input-4',
 *                  label: {
 *                      left: {
 *                          text: 'Address',
 *                          className: 'label-1',
 *                      },
 *                      right: {
 *                          text: 'right label',
 *                          className: 'label-2',
 *                      },
 *                  },
 *              };
 *              setInputs([...inputs, newInput]);
 *          };
 *          
 *          const handleDeleteInput = (index) => {
 *              const updatedInputs = inputs.filter((_, i) => i !== index);
 *              setInputs(updatedInputs);
 *          };
 *          
 *          return (
 *              <>
 *                  <Input
 *                      data={inputs}
 *                      addable={{
 *                          status: true,
 *                          inputProps: {
 *                              label: {
 *                                  left: {
 *                                      text: 'left label',
 *                                      className: 'label-3',
 *                                  },
 *                                  right: {
 *                                      text: 'right label',
 *                                      className: 'label-4',
 *                                  },
 *                              },
 *                          },
 *                          button: {
 *                              text: 'Add',
 *                              className: 'button-1',
 *                              onClick: handleAddInput,
 *                          },
 *                          deleteButton: {
 *                              text: 'Delete',
 *                              className: 'button-2',
 *                              onClick: (index) => handleDeleteInput(index),
 *                          },
 *                      }}
 *                  />
 *              </>
 *          );
 *      };
 *      
 *      export default App;
 */
export const Input = ({ data = [], onChange, wrapper = [], addable = {}, ...props }) => {
    const [inputs, setInputs] = useState(() => FindDuplicateArrayValue(data, ['name', 'id'], ''));
    const [inputValues, setInputValues] = useState(inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.value ? input.value : '' }), {}));
    const [lastAddedElement, setLastAddedElement] = useState(null);
    const [deletedElementInfo, setDeletedElementInfo] = useState(null);

    useEffect(() => {
        setInputs(FindDuplicateArrayValue(data, ['name', 'id'], ''));
        setInputValues(inputs.reduce((acc, input) => ({ ...acc, [input.name]: input.value ? input.value : '' }), {}));
    }, [data, addable.status]);

    const WrapperTag = wrapper?.tag || 'div';

    /**
     * Handles the change event of an input element.
     * Updates the value of the input element in the state based on the event target's name and value.
     * Calls the onChange callback function with the event.
     * @param {number} index - The index of the input element that changed.
     * @param {object} event - The event object.
     */
    const handleChange = (index, event) => {
        const updatedInputs = inputs.map((input, i) =>
            i === index ? { ...input, value: event.target.value } : input
        );
        setInputs(updatedInputs);
        setInputValues(updatedInputs.reduce((acc, input) => ({ ...acc, [input.name]: input.value ? input.value : '' }), {}));
        if (onChange) {
            onChange(event);
        }
    };

    const { left, right } = addable.label || { left: {}, right: {} };
    const getNextLabel = (baseLabel, index, increments, position) => NextIncrement(index, increments, baseLabel, position);
    
    /**
     * Handles the addition of a new input element when the add button is clicked.
     * If the addable prop is true, it will create a new input element with an incremented name and id.
     * If the addable prop is false and the inputs array is not empty, it will create a new input element with the same name and id as the last element in the inputs array.
     * If the addable prop is false and the inputs array is empty, it will create a new input element with the same name and id as the data array if it is not empty.
     * If the addable prop is false and the inputs array is empty and the data array is empty, it will create a new input element with a default name and id.
     * It will then update the inputs state with the new input element.
     */
    const handleAddInput = () => {
        const lastElementIndex     = inputs.length - 1;
        const lastAddedElementName = lastAddedElement?.name || inputs[lastElementIndex]?.name || '';
        const lastAddedElementId   = lastAddedElement?.id   || inputs[lastElementIndex]?.id   || '';

        if (addable.status) {
            const newInputName = `${addable.inputProps.name}[${lastAddedElementName.match(/\[(\d+)\]/) ? Number(lastAddedElementName.match(/\[(\d+)\]/)[1]) + 1 : 0}]`;
            const newInputId   = `${addable.inputProps.id}[${lastAddedElementId.match(/\[(\d+)\]/)     ? Number(lastAddedElementId.match(/\[(\d+)\]/)[1]) + 1 : 0}]`;

            // Add The Incremental Bracket For Duplicate Name And ID For The Un-Bracketed First Element Found In The Inputs Array
            let countElements   = inputs.length - data.length;
            data.map((item, index) => {
                if (item.name === addable.inputProps.name) data[index].name = `${data[index].name}[${countElements}]`;
                if (item.id   === addable.inputProps.id)   data[index].id   = `${data[index].id}[${countElements}]`;
            })

            const newInput = {
                ...addable.inputProps,
                name     : newInputName,
                id       : newInputId,
                value    : '',
                label    : {
                    left : {
                        text : getNextLabel(left?.text || '', inputs.length, left?.increments, 'left'),
                        className: left?.className,
                        id: left?.id,
                        ...left?.props
                    },
                    right: {
                        text : getNextLabel(right?.text || '', inputs.length, right?.increments, 'right'),
                        className: right?.className,
                        id: right?.id,
                        ...right?.props
                    }
                }
            };

            setLastAddedElement(newInput);
            setInputs([...inputs, newInput]);
        }
    };

    /**
     * Handles the deletion of an input element.
     * If the element has the same id and name as the data[index], it will be removed from the inputs array.
     * If the element was added by the user, it will be removed from the inputs array.
     * If the element is the last one, and the addable.minButtonLeft is set to 0, it will be removed from the inputs array.
     * If the element is not the last one, it will be removed from the inputs array, and the input values will be updated.
     * @param {number} index - The index of the element to be deleted.
     */
    const handleDeleteInput = (index) => {
        const deletedElement = inputs[index];
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

        if (inputs.length > (addable.minButtonLeft || 0) && (!addable.deleteOnlyAdded || inputs[index].name !== (data[index] || {}).name)) {
            const updatedInputs = inputs.filter((_, i) => i !== index);
            setInputs(updatedInputs);
            setInputValues(updatedInputs.reduce((acc, input) => {
                return { ...acc, [input.name]: input.value ? input.value : '' };
            }, {}));
        }
    };
    
    return (
        <>
            {inputs.map((input, index) => (
                <WrapperTag key={index} {...wrapper}>
                    {input.label?.left && (
                        <Label
                            text       = {input.label.left.text}
                            htmlFor    = {input.id}
                            increments = {input.label.left.increments}
                            className  = {input.label.left.className}
                            id         = {input.label.left.id}
                            {...input.label.left.props}
                        />
                    )}
                    {input.type === 'textarea' ? (
                        <textarea
                            name      = {input.name}
                            id        = {input.id}
                            className = {input.className}
                            value     = {inputValues[input.name] || ''}
                            onChange  = {event => handleChange(index, event)}
                            {...input.props}
                        />
                    ) : (
                        <input
                            type      = {input.type? input.type : 'text'}
                            name      = {input.name}
                            id        = {input.id}
                            className = {input.className}
                            value     = {inputValues[input.name] || ''}
                            onChange  = {event => handleChange(index, event)}
                            {...input.props}
                        />
                    )}
                    {input.label?.right && (
                        <Label
                            text       = {input.label.right.text}
                            htmlFor    = {input.id}
                            increments = {input.label.right.increments}
                            className  = {input.label.right.className}
                            id         = {input.label.right.id}
                            {...input.label.right.props}
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