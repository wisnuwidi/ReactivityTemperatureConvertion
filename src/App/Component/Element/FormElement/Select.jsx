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
import { NextIncrement, HandleDuplicateValues } from '../../Helper/ConstantMotion';


/**
 * @function Select
 * 
 * @description
 *      A function component for rendering a single or multiple select elements in a form.
 *      It manages the state of each select based on the provided data.
 *      The user can also set the ability to add new select elements.
 *      The user can also set the minimum number of delete buttons to be shown.
 * @param {object} props - The props object.
 * @param {array} [props.options]
 *      - An array of objects containing the value and text for each option.
 *      - If not provided, it will render a single select element with no options.
 * @param {function} [props.onChange]
 *      - The function that will be called whenever the value of any select element changes.
 *      - It receives an object with the current values of all selects.
 * @param {boolean} [props.addable=false]
 *      - If true, the component will render a button for adding a new select element.
 *      - If the component was created with `addable` set to true, the button for adding a new select element will be enabled.
 *      - If the button is clicked, the component will create a new select element and append it to the select elements array.
 * @param {string} [props.addText="Add"]
 *      - The text content of the button for adding a new select element.
 * @param {function} [props.onAdd]
 *      - The function that will be called when the user clicks the button for adding a new select element.
 *      - It receives the new select element as an argument.
 * @param {function} [props.onDelete]
 *      - The function that will be called when the user clicks the button for deleting a select element.
 *      - It receives the select element that was deleted as an argument.
 * @param {string} [props.deleteText="Delete"]
 *      - The text content of the button for deleting a select element.
 * @param {object} [props.wrapperProps]
 *      - The props of the wrapper element that will be used to wrap the select elements.
 *      - If not provided, the component will use the default div tag.
 * @param {number} [props.minDeleteButton=0]
 *      - The minimum number of delete buttons to be shown.
 *      - If the number of delete buttons reaches this number, the delete button will be destroyed.
 *      - If the number of delete buttons is less than this number, the delete button will be shown again.
 * @example
    <Select
        name="mySelect"
        value="option1"
        options={[
            { value: "option1", text: "Opsi 1" },
            { value: "option2", text: "Opsi 2" }
        ]}
        className="selection-method s-25 line-box"
        onChange={(event) => console.log(event.target.value)}
        wrapper={[{ tag: "article", className: "multi-select-wrapper" }]}
        addable={[{
            status: true,
            options: {
                add: { text: "Tambahkan", className: "add-button" },
                delete: { text: "Hapus", className: "remove-button" }
            },
            default: {
                name: "selectadd",
                className: "selection-method s-25 line-box",
                options: [
                    { value: "option1", text: "Opsi 1" },
                    { value: "option2", text: "Opsi 2" }
                ]
            }
        }]}
    />
 */
export const Select = ({
    options = [],
    onChange,
    wrapper = [],
    addable = [],
    ...props
}) => {
    const [selects, setSelects] = useState(() => HandleDuplicateValues([{
        value: props.value,
        className: props.className,
        options,
        label: props.label || null,
        name: props.name || '',
        id: props.id || '',
    }], ['name', 'id']));

    useEffect(() => {
        setSelects(HandleDuplicateValues([{
            value: props.value,
            className: props.className,
            options,
            label: props.label || null,
            name: props.name || '',
            id: props.id || '',
        }], ['name', 'id']));
    }, [props.value, props.className, options, props.label, props.name, props.id]);
    
    const addableDefault     = addable[0].default ?? selects[0];
    const addableLabel       = addableDefault?.label ?? {};
    const { prefix, suffix } = addableLabel?.increments? addableLabel?.increments[0] : '' || {};
    const position           = prefix && suffix ? 'prefix|suffix' : prefix ? 'prefix' : suffix ? 'suffix' : false;

    const getNextLabel = (baseLabel, index, increments, position) => NextIncrement(index, increments, baseLabel, position);

    const handleAdd = () => {
        if (!addable.length || !addable[0].status) return;
        
        let everFoundDuplicate = {};
        let firstSelectCheck   = [selects[0].name, selects[0].id];
        let firstAddableCheck  = [addableDefault.name, addableDefault.id];
        const isSameName       = firstSelectCheck[0] === firstAddableCheck[0];
        const isSameId         = firstSelectCheck[1] === firstAddableCheck[1];
        
        if (isSameName && isSameId) {
            everFoundDuplicate.name = true;
            everFoundDuplicate.id   = true;
        } else if (isSameName) {
            everFoundDuplicate.name = true;
        } else if (isSameId) {
            everFoundDuplicate.id   = true;
        }

        if (selects.length === 1) {
            if (isSameName && isSameId) {
                selects[0].name = `${selects[0].name}[0]`;
                selects[0].id   = `${selects[0].id}[0]`;
            } else if (isSameName) {
                selects[0].name = `${selects[0].name}[0]`;
            } else if (isSameId) {
                selects[0].id   = `${selects[0].id}[0]`;
            }
        }
        
        if (selects.length === 2 && Object.values(everFoundDuplicate).some(value => value === true)) {
            addableDefault.name = addableDefault.name.replace('[1]', '');
            addableDefault.id   = addableDefault.id.replace('[1]', '');
        }
        
        if (selects.length >= 2) {
            everFoundDuplicate = {};
        }
        console.log(everFoundDuplicate);

        const newSelect = {
            name      : `${addableDefault?.name? addableDefault?.name : 'select'}[${selects.length}]`,
            id        : `${addableDefault?.id ? addableDefault?.id : addableDefault?.name? addableDefault?.name : 'select'}[${selects.length}]`,
            options   : addableDefault.options,
            className : addableDefault.className,
            value     : '',
            label     : {
                ...addableLabel,
                text: getNextLabel(addableLabel?.text || '', selects.length, addableLabel?.increments?.[0], position),
                ...addableLabel.props
            },
        };
       
        setSelects([...selects, newSelect]);
    };

    const handleDelete = (index) => {
        setSelects(selects.filter((_, i) => i !== index));
    };

    const handleChange = (index, event) => {
        const updatedSelects = selects.map((select, i) =>
            i === index ? { ...select, value: event.target.value } : select
        );
        setSelects(HandleDuplicateValues(updatedSelects, ['name', 'id']));
        onChange && onChange(event);
    };

    const WrapperTag = wrapper[0]?.tag || 'div';

    return (
        <>
            {selects.map((select, index) => (
                <WrapperTag key={index} {...wrapper[0]}>
                    {select.label && select.label.position === 'left' && (
                        <label className={select.label.className}>{select.label.text}</label>
                    )}
                    <select
                        name={select.name}
                        value={select.value}
                        onChange={(event) => handleChange(index, event)}
                        className={select.className}
                        id={select.id}
                    >
                        {select.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                    {select.label && select.label.position === 'right' && (
                        <label className={select.label.className}>{select.label.text}</label>
                    )}
                    {addable.length && addable[0].status && (
                        <button onClick={() => handleDelete(index)} className={addable[0].options.delete.className}>
                            {addable[0].options.delete.text}
                        </button>
                    )}
                </WrapperTag>
            ))}
            {addable.length && addable[0].status && (
                <button onClick={handleAdd} className={addable[0].options.add.className}>
                    {addable[0].options.add.text}
                </button>
            )}
        </>
    );
};




/**
 * @function MultiSelect
 * @description - Komponen fungsional untuk membuat beberapa elemen select dalam formulir.
 *      - Komponen ini memungkinkan pengguna untuk mengelola beberapa pilihan, dan mendukung penambahan atau penghapusan elemen select.
 *      - Jika properti addable bernilai true, maka akan ditampilkan tombol "Add" untuk menambahkan elemen select baru, dan setiap elemen baru akan memiliki tombol "Delete".
 *      - Jika properti addable bernilai false, maka hanya akan ditampilkan elemen select berdasarkan data yang diberikan.
 *      - Komponen ini juga mendukung fungsi callback yang akan dipanggil ketika nilai dari elemen select berubah.
 *      - Komponen ini juga mendukung properti label yang akan ditampilkan sebagai elemen label, yang dapat memiliki properti sendiri dan dapat diatur untuk posisi di kanan atau kiri dari kotak select.
 *      - Properti label dapat berupa objek dengan properti sebagai berikut:
 *          - text: string - Teks label yang akan ditampilkan.
 *          - position: string - Posisi label, dapat berupa "left" atau "right".
 *          - increments: array - Array yang berisi objek-objek dengan properti sebagai berikut:
 *              - type: string - Tipe awalan/akhiran label, dapat berupa "number" atau "alphabetical".
 *              - prefix: boolean - Jika true, maka awalan/sufiks akan ditampilkan sebelum teks label.
 *              - suffix: boolean - Jika true, maka awalan/sufiks akan ditampilkan setelah teks label.
 *      - Jika tidak ada label yang diatur, maka tidak akan ditampilkan label untuk elemen select.
 *      - Elemen wrapper dapat diatur dengan tag HTML yang berbeda. Jika tidak diatur, akan menggunakan elemen div secara default.
 * @param {object} props - Objek properti.
 * @param {array} [props.data] - Array yang berisi objek-objek dengan nama, opsi, className, id, dan label untuk setiap elemen select.
 *      - Setiap objek harus memiliki properti "name", "options" yang berisi array dengan nilai dan teks untuk setiap opsi, "className" untuk elemen select, "id" untuk elemen select, dan label opsional dengan teks label dan posisi.
 * @param {function} [props.onChange] - Fungsi callback yang akan dipanggil ketika nilai dari elemen select berubah.
 * @param {array} [props.addable] - Array yang berisi objek-objek dengan properti sebagai berikut:
 *      - status: boolean - Jika true, maka akan diizinkan menambahkan beberapa elemen select.
 *      - options: object - Objek dengan properti add dan delete button.
 *          - add: object - Objek dengan properti teks, className, dan id untuk tombol "Add".
 *          - delete: object - Objek dengan properti teks, className, dan id untuk tombol "Delete".
 *      - wrapper: object - Objek dengan properti tag, className, dan id untuk elemen wrapper.
 *      - default: object - Objek dengan properti default untuk elemen select, seperti nama, opsi, className, dan id.
 *      - label: object - Objek opsional dengan properti teks label, posisi, dan awalan/sufiks.
 * @example
    <MultiSelect
        data={[
            { 
                name: "select1",
                options: [
                    { value: "option1", text: "Option 1" },
                    { value: "option2", text: "Option 2" },
                ],
                className: "selection-method s-25 line-box",
                id: "select-id",
                label: {
                    text: "Label Select", 
                    position: "left",
                    increments: [
                        { 
                            type: "number", 
                            prefix: true, 
                            suffix: true 
                        }
                    ]
                }
            }
        ]}
        onChange={(event) => console.log(event.target.value)}
        addable={[ 
            { 
                status: true, 
                options: { 
                    add: { text: "Add", className: "add-button", id: "add-button-id" }, 
                    delete: { text: "Delete", className: "remove-button", id: "remove-button-id" } 
                }, 
                wrapper: { tag: "div", className: "multi-select-wrapper", id: "multi-select-wrapper-id" },
                default: { 
                    name: "select-name-added", 
                    id: "select-id-added", 
                    className: "select-class-added", 
                    options: [
                        { value: "option3", text: "Option 3" }, 
                        { value: "option4", text: "Option 4" }, 
                    ]
                },
                label: { 
                    text: "Label Select", 
                    position: "left",
                    increments: [
                        { 
                            type: "number", 
                            prefix: true, 
                            suffix: true 
                        }
                    ]
                }
            }
        ]}
        wrapper={ [{ 
            tag: "span", 
            className: "multi-select-wrapper", 
            id: "multi-select-wrapper-id", 
            style: { 
                display: "flex", 
            } 
        }]}
    />
 */
export const MultiSelect = ({ 
    data = [], 
    onChange, 
    wrapper = [], 
    addable = [], 
    ...props 
}) => {

    const [selects, setSelects] = React.useState(HandleDuplicateValues(data, ['name', 'id']));

    useEffect(() => {
        setSelects(HandleDuplicateValues(data, ['name', 'id']));
    }, [data]);

    const { status, options, wrapper: addableWrapper, default: defaultSelect, label: addableLabel = {} } = addable[0] || {};

    const addableDefault = defaultSelect || data[data.length - 1];

    const { prefix, suffix } = addableLabel?.increments? addableLabel?.increments[0] : '' || {};
    const position = prefix && suffix ? 'prefix|suffix' : prefix ? 'prefix' : suffix ? 'suffix' : false;
    
    const getNextLabel = (baseLabel, index, increments, position) => NextIncrement(index, increments, baseLabel, position);
    
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
     * Menambahkan elemen select baru ke dalam array selects.
     * Elemen select baru dibuat dengan nama yang di-generate otomatis berdasarkan nama elemen select terakhir,
     * id yang di-generate otomatis berdasarkan nama elemen select terakhir,
     * opsi yang sama dengan elemen select terakhir,
     * kelas yang sama dengan elemen select terakhir,
     * dan label yang sama dengan elemen select terakhir dengan teks yang diupdate berdasarkan incremental label.
     * Kemudian, mengupdate array selects dengan menambahkan elemen select baru ke dalam array selects.
     */
    const handleAdd = () => {
        const newSelect = {
            name: `${addableDefault?.name? addableDefault?.name : 'select'}[${selects.length + 1}]`,
            id: `${addableDefault?.id ? addableDefault?.id : addableDefault?.name? addableDefault?.name : 'select'}[${selects.length + 1}]`,
            options: addableDefault.options,
            className: addableDefault.className,
            value: '',
            label: {
                ...addableLabel,
                text: getNextLabel(addableLabel?.text || '', selects.length, addableLabel?.increments?.[0], position),
                ...addableLabel.props
            },
        };
        
        setSelects([...selects, newSelect]);
    };

    const handleDelete = (index) => {
        setSelects(selects.filter((_, i) => i !== index));
    };

    const WrapperTag = wrapper[0]?.tag || 'div';

    return (
        <>
            {selects.map((select, index) => (
                <WrapperTag key={index} {...wrapper[0]}>
                    {select.label && select.label.position === 'left' && (
                        <label
                            className={select.label.className}
                            style={select.label.style}
                            {...select.label.props}
                        >
                            {select.label.text}
                        </label>
                    )}
                    <select
                        name={select.name}
                        value={select.value}
                        onChange={(event) => handleChange(index, event)}
                        className={select.className}
                        id={select.id}
                    >
                        {select.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                    {select.label && select.label.position === 'right' && (
                        <label
                            className={select.label.className}
                            style={select.label.style}
                            {...select.label.props}
                        >
                            {select.label.text}
                        </label>
                    )}
                    {status && selects.length > 1 && (
                        <button type="button" {...options.delete} onClick={() => handleDelete(index)}>
                            {options.delete.text}
                        </button>
                    )}
                </WrapperTag>
            ))}
            {status && (
                <button type="button" {...options.add} onClick={handleAdd}>
                    {options.add.text}
                </button>
            )}
        </>
    );
};
