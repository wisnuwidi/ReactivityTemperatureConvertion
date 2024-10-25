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
import { AlphaNext, NextIncrement, HandleDuplicateValues } from '../../Helper/ConstantMotion';

/**
 * @function Select
 * @description - Komponen React untuk membuat select elemen dalam form.
 *      - Komponen ini mendukung mengelola state setiap select elemen dan memungkinkan menambahkan elemen select baru secara dinamis.
 *      - Pengguna dapat mengatur kemampuan untuk menambahkan elemen select baru dan menentukan jumlah minimal tombol hapus yang akan ditampilkan.
 *      - Pengguna dapat juga melewati fungsi custom untuk menghandle event onChange setiap select elemen.
 *      - Tag wrapper dapat diatur oleh pengguna. Jika tidak diatur, maka akan menggunakan tag div secara default.
 * @param {object} props - Objek properti.
 * @param {array} [props.options] - Array yang berisi objek-objek dengan properti sebagai berikut:
 *      - value: string - Nilai dari opsi.
 *      - text: string - Teks dari opsi.
 *      - className: string - Nama kelas untuk opsi.
 * @param {function} [props.onChange] - Fungsi yang akan dipanggil ketika nilai dari select elemen berubah.
 *      - Fungsi ini menerima nilai-nilai saat ini dari semua select sebagai argument.
 * @param {array} [props.wrapper] - Array yang berisi konfigurasi wrapper.
 *      - Tag wrapper dapat diatur oleh pengguna.
 *      - Jika tidak diatur, maka akan menggunakan tag div secara default.
 *      - Pada setiap objeknya disarankan untuk diberikan beberapa properti sebagai berikut:
 *          - tag: string - Tag HTML untuk membungkus select elemen.
 *          - className: string - Nama kelas untuk wrapper elemen.
 * @param {array} [props.addable] - Array yang berisi objek-objek dengan properti sebagai berikut:
 *      - status: boolean - Jika true, maka akan ditampilkan tombol untuk menambahkan elemen select baru.
 *      - increments: array - Array yang berisi objek-objek dengan properti sebagai berikut:
 *          - type: string - Tipe awalan/sufiks, dapat berupa "number" atau "alphabetical".
 *          - prefix: boolean - Jika true, maka awalan/sufiks akan ditampilkan sebelum nilai select elemen.
 *          - suffix: boolean - Jika true, maka awalan/sufiks akan ditampilkan setelah nilai select elemen.
 * @example
 * <Select
 *      name="mySelect"
 *      value="option1"
 *      options={[
 *          { value: "option1", text: "Opsi 1" },
 *          { value: "option2", text: "Opsi 2" }
 *      ]}
 *      className="selection-method s-25 line-box"
 *      onChange={(event) => console.log(event.target.value)}
 *      wrapper={[{ tag: "article", className: "multi-select-wrapper" }]}
 *      addable={[{
 *          status: true,
 *          options: {
 *              add: { text: "Tambahkan", className: "add-button" },
 *              delete: { text: "Hapus", className: "remove-button" }
 *          },
 *          default: {
 *              name: "selectadd",
 *              className: "selection-method s-25 line-box",
 *              options: [
 *                  { value: "option3", text: "Opsi 3" },
 *                  { value: "option4", text: "Opsi 4" }
 *              ]
 *          },
 *          label: {
 *              text: "Label Select",
 *              position: "left",
 *              increments: [{ type: "alphabetical", suffix: true }],
 *              className: "multi-select-label-class"
 *          }
 *      }]}
 * />
 */
export const Select = ({
    options = [],
    onChange,
    wrapper = [],
    addable = [],
    ...props
}) => {
    const [selects, setSelects] = React.useState([
        { value: props.value, className: props.className, options }
    ]);

    useEffect(() => {
        setSelects([{ value: props.value, className: props.className, options }]);
    }, [props.value, props.className, options]);

    const handleChange = (index, event) => {
        const updatedSelects = selects.map((select, i) => 
            i === index ? { ...select, value: event.target.value } : select
        );
        setSelects(updatedSelects);
        if (onChange) {
            onChange(event);
        }
    };

    const handleAdd = () => {
        if (addable.length && addable[0].status) {
            const newSelect = addable[0].default;
            const newLabelConfig = addable[0].label.increments[0];
            let newLabel;

            if (newLabelConfig.type === 'number') {
                newLabel = newSelect.label ? newSelect.label.text + (selects.length + 1) : (selects.length + 1).toString();
            } else if (newLabelConfig.type === 'alphabetical') {
                const alphaNext = AlphaNext();
                let nextLoop = 0;
                for (let i = 0; i < selects.length; i++) {
                    nextLoop = selects.length + 1;
                    alphaNext(nextLoop);
                }

                if (newLabelConfig.suffix) {
                    newLabel = newSelect.label ? newSelect.label.text.replace(/[0-9]/g, '') + ` ` + alphaNext(nextLoop) : alphaNext(nextLoop);
                } else {
                    newLabel = alphaNext(nextLoop) + ` ${newSelect.label ? newSelect.label.text.replace(/[0-9]/g, '') : ''}`;
                }
            }

            setSelects([
                ...selects,
                {
                    ...newSelect,
                    value: '',
                    label: newLabel,
                }
            ]);
        }
    };

    const handleDelete = (index) => {
        setSelects(selects.filter((_, i) => i !== index));
    };

    const nameAttribute = addable.length && addable[0].status ? `${props.name}[]` : props.name;
    const labelStyle = addable.length && addable[0].label.position === 'left' ? { float: 'left' } : { float: 'right' };
    const WrapperTag = wrapper[0].tag || 'div';

    return (
        <>
            {selects.map((select, index) => (
                <WrapperTag key={index} {...wrapper[0]}>
                    {addable.length && addable[0].label.position === 'left' && (
                        <label
                            className={addable[0].label.className}
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
                        {select.options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                                {option.text}
                            </option>
                        ))}
                    </select>
                    {addable.length && addable[0].label.position === 'right' && (
                        <label
                            className={addable[0].label.className}
                            style={labelStyle}
                        >
                            {select.label}
                        </label>
                    )}
                    {addable.length && addable[0].status && selects.length > 1 && (
                        <button type="button" {...addable[0].options.delete} onClick={() => handleDelete(index)}>
                            {addable[0].options.delete.text}
                        </button>
                    )}
                </WrapperTag>
            ))}
            {addable.length && addable[0].status && (
                <button type="button" {...addable[0].options.add} onClick={handleAdd}>
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
