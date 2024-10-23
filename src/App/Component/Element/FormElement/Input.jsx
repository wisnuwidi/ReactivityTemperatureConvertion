/**
 * @filename        : Input.js
 * @license         : MIT
 * @copyright       : 2023 IncoDIY
 * @time Created at : 23-10-2024, 21:43:19
 * @email           : IncoDIY<incodiy@gmail.com>
 * @author          : IncoDIY<incodiy@gmail.com>
 * @description     : This file contains a function component for rendering input elements in a form.
 *                    It supports managing the state of multiple input elements and allows adding new inputs dynamically.
 */

import React, { useEffect } from 'react';

/**
 * @function Input
 * 
 * @description
 *      A function component for rendering multiple input elements in a form.
 *      It manages the state of each input based on the provided data.
 *      The user can also set the ability to add new input elements.
 *      The user can also set the minimum number of delete buttons to be shown.
 * @param {object} props - The props object.
 * @param {array} [props.data]
 *      - An array of objects containing the name, value, and className for each input element.
 *      - If not provided, it will render a single input element with an empty name, value, and className.
 * @param {function} [props.onChange]
 *      - The function that will be called whenever the value of any input element changes.
 *      - It receives an object with the current values of all inputs.
 * @param {boolean} [props.addable=false]
 *      - If true, the component will render a button for adding a new input element.
 *      - If the component was created with `addable` set to true, the button for adding a new input element will be enabled.
 *      - If the button is clicked, the component will create a new input element and append it to the input elements array.
 * @param {string} [props.addText="Add"]
 *      - The text content of the button for adding a new input element.
 * @param {function} [props.onAdd]
 *      - The function that will be called when the user clicks the button for adding a new input element.
 *      - It receives the new input element as an argument.
 * @param {function} [props.onDelete]
 *      - The function that will be called when the user clicks the button for deleting an input element.
 *      - It receives the input element that was deleted as an argument.
 * @param {string} [props.deleteText="Delete"]
 *      - The text content of the button for deleting an input element.
 * @param {object} [props.wrapperProps]
 *      - The props of the wrapper element that will be used to wrap the input elements.
 *      - If not provided, the component will use the default div tag.
 * @param {number} [props.minDeleteButton=0]
 *      - The minimum number of delete buttons to be shown.
 *      - If the number of delete buttons reaches this number, the delete button will be destroyed.
 *      - If the number of delete buttons is less than this number, the delete button will be shown again.
 * @example
    <Input
        name="input-name"
        className="input-class" 
        data={[
            { name: "user-name", value: "IncoDIY", className: "input" },
            { name: "user-email", value: "username@incodiy.com", className: "input" }
        ]}
        addable={true}
        onChange={(values) => console.log(values)}
        onAdd={(newInput) => console.log(newInput)}
        onDelete={(deletedInput) => console.log(deletedInput)}
        wrapperProps={{
            className: "wrapper-class",
            style: {
                display: "flex",
            },
        }}
        minDeleteButton={2}
        addText="Tambah"
        deleteText="Hapus"
    />
 */
function Input ({ name, data, onChange, addable = false, onAdd, onDelete, wrapperProps, minDeleteButton = 0, addText = "Add", deleteText = "Delete", ...props }) {
    const [inputs, setInputs] = React.useState(
        data ? data.map((input) => ({
            name: `${name}[${data.indexOf(input)}]`,
            value: input.value !== undefined ? input.value : '',
            className: input.className !== undefined ? input.className : '',
        })) : [{ name: `${name}[0]`, value: '', className: '' }]
    );

    useEffect(() => {
        setInputs(data ? data.map((input) => ({
            name: `${name}[${data.indexOf(input)}]`,
            value: input.value !== undefined ? input.value : '',
            className: input.className !== undefined ? input.className : '',
        })) : [{ name: `${name}[0]`, value: '', className: '' }]);
    }, [data]);

    const firstClassName = React.useMemo(() => inputs.length > 0 ? inputs[0].className : '', [inputs]);

    /**
     * Handles the change event of an input element.
     * Updates the value of the input element in the state based on the event target's name.
     * Calls the onChange callback function with the updated values.
     */
    const handleChange = (event) => {
        const updatedInputs = inputs.map((input) => {
            if (input.name === event.target.name) {
                return {
                    ...input,
                    value: event.target.value,
                };
            }
            return input;
        });
        setInputs(updatedInputs);

        if (onChange) {
            const values = updatedInputs.reduce((acc, input) => {
                acc[input.name] = input.value;
                return acc;
            }, {});
            onChange(values);
        }
    };

    /**
     * Handles the addition of a new input element.
     * If the onAdd callback function is provided, creates a new input object with an auto-generated name,
     * an empty value, and a class name based on the first input element's class name.
     * Adds the new input to the existing inputs array and calls the onAdd function with the new input.
     */
    const handleAdd = () => {
        if (onAdd) {
            const newInput = {
                name: `${name}[${inputs.length}]`,
                value: '',
                className: firstClassName,
            };
            setInputs([...inputs, newInput]);
            onAdd(newInput);
        }
    };

    /**
     * Handles the deletion of an input element.
     * If the onDelete callback function is provided, sets the inputs state to the existing inputs array
     * with the input element at the given index removed, and calls the onDelete function with the deleted
     * input element.
     * @param {number} index - The index of the input element to be deleted.
     */
    const handleDelete = (index) => {
        if (onDelete) {
            const deletedInput = inputs[index];
            setInputs(inputs.filter((input, i) => i !== index));
            onDelete(deletedInput);
        }
    };

    return (
        <>
            {inputs.map((input, index) => (
                <div key={input.name} {...wrapperProps}>
                    <input
                        name={input.name}
                        className={input.className}
                        {...props}
                        value={input.value !== '' ? input.value : undefined}
                        onChange={handleChange}
                    />
                    {addable && inputs.length > minDeleteButton && (
                        <button
                            className="delete-input"
                            type="button"
                            onClick={() => handleDelete(index)}
                        >
                            {deleteText}
                        </button>
                    )}
                </div>
            ))}
            {addable && (
                <button
                    className="add-input"
                    type="button"
                    onClick={handleAdd}
                >
                    {addText}
                </button>
            )}
        </>
    );
}

export default Input;