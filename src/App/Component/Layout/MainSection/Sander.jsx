import { Select } from '../../Element/FormElement/Select';
import { Input } from '../../Element/FormElement/Input';
import { Check } from '../../Element/FormElement/Check';
import { Radio } from '../../Element/FormElement/Radio';
import { FileInput } from '../../Element/FormElement/FileInput';
import { Table } from '../../Element/TableElement/Table';

export default function Sander () {  
    return (
        <>
            <SenderTable />

            {/* <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
                <img src="https://play.tailwindcss.com/img/beams.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
                <div className="absolute inset-0 bg-[url(https://play.tailwindcss.com/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                    <div className="mx-auto max-w-md">
                        CONTENT
                    </div>
                </div>
            </div> */}

        </>
    );
}

export const SenderTable = () => {
    return <Table
    //    name="Sanders"
    //    className='table table-compact table-zebra border-collapse'
        wrapper= {{
            tag: 'article',
            // className: 'rounded-sm wrapper-table',
            // id: 'table-sander-id',
        }}
        config={{
            formats: {
                currency: {
                    currency: 'USD',
                    minimumFractionDigits: 2
                },
                image: {
                    className: 'w-10 h-10 rounded-full m-auto'
                }
            },
            column: {
                "salary": 'currency',
                "bonus": 'currency',
                "photo": 'image'
            }
        }}
        head={{
            "name": "Nama",
            "first_name": "Panggilan",
            "photo": "Photo",
            "age": "Umur",
            "phone": "Telepon",
            "address": "Alamat",
            "salary": "Gaji",
            "bonus": "Bonus",
            "promoted_date": "Tanggal Masuk",
            "position": "Jabatan",
            "category": "Kategori",
            "active_status": "Status"
        }}
        data={require('../../../Develop/DummyData/DataTable.json').map((item, index) => {
            return {
                "ID": index + 1,
                "name": item.name,
                "first_name": item.first_name,
                "photo": item.photo,
                "age": item.age,
                "phone": item.phone,
                "address": item.address,
                "salary": item.salary,
                "bonus": item.bonus,
                "promoted_date": item.promoted_date,
                "position": item.position,
                "category": item.category,
                "active_status": item.active_status ? 'Aktif' : 'Tidak Aktif',
            }
        })}
        footer={[
            {
                name: 'Total',
                age: '',
                address: '',
                salary: require('../../../Develop/DummyData/DataTable.json').reduce((total, item) => total + item.salary, 0)
            },
        ]}
        onRowClick={(event, row) => console.log('row clicked', row)}
        onCellClick={(event, row, cell) => console.log('cell clicked', row, cell)}
        cellProps={{
        //    className: 'text-center',
        //    style: {padding: '10px',}
        }}
        customCell={(row, cellKey) => {
            const cellValue = row[cellKey];
            return (
                <a href="#" style={{ color: 'blue' }}>
                    {cellValue}
                </a>
            );
        }}
        options={{
            search: {
                input: {
                //    className: 'input input-bordered',
                },
                label: {
                    //    text: 'Cari ',
                   //     className: 'input-label',
                },
                wrapper: {
                    className: 'flex justify-end setbyuser',
                    // style: {
                    //     display: 'flex',
                    //     justifyContent: 'space-between',
                    //     alignItems: 'center',
                    // },
                },
            },// Enable search functionality
            increment: {
                text: 'Row #',
                type: 'number',
                checkLists: true
            },
            pageSizeOptions: [5, 10, 25, 50, 100],
            pageSizeProps: {
             //   className: 'pageSizeProps-class',
                style: {
                    border: '1px solid #ccc',
                    padding: '5px',
                }
            },
            paginate: {
                firstPage: true,
                previous: true,
                next: true,
                lastPage: true,
                maxItems: 5,
                displayedButtons: 5,
                text: {
                    button: {
                        firstPage: 'Awal',
                        previous: 'Sebelumnya',
                        next: 'Selanjutnya',
                        lastPage: 'Terakhir',
                    },
                },
                properties: {
                    wrapper: {
                        type: 'nav',
                        props: {
                         //   className: 'flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6',
                        },
                    },
                    button: {
                      //  type: 'a',
                      //  className: 'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:cursor-pointer',
                      //  style: {},
                    },
                    ul: {
                     //   className: 'isolate inline-flex -space-x-px rounded-md shadow-sm',
                    },
                    li: {
                     //   className: ''
                    },
                    currentButton: {
                        li: {
                            className: 'active',
                        //    style: {},
                        },
                        button: {
                         //   className: 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                            style: {
                            //    pointerEvents: 'none',
                            },
                        },
                    },
                },
                listDataInfo: {
                    type: 'div',
                    position: 'left',
                //    props: {
                    //    style: {textAlign: 'center',},
                    //    className: 'text-sm',
                 //   },
                    showingText: 'Displaying',
                    toText: 'to',
                    ofText: 'of',
                    entriesText: 'items',
                    showTextWrappers: {
                    //    showingText: { tag: 'span', props: { className: 'font-bold' } },
                    //    toText: { tag: 'em', props: { className: 'font-semibold' } },
                    //    ofText: { tag: 'strong', props: { className: 'font-bold' } },
                    //    entriesText: { tag: 'span', props: { className: 'font-bold' } },
                    },
                },
            },
            properties: {
                thead: {
                    props: {},
                    tr: {},
                    td: {
                    //    className: 'border bg-violet-100 text-gray-600',
                        style: {},
                    }
                },
                tbody: {
                    props: {},
                    tr: {},
                    td: {
                        className: 'border text-gray-500',
                        style: {},
                    }
                },
                tfooter: {
                    props: {
                        className: 'tfooter-props-class',
                        style: {},
                    },
                    tr: {
                        className: 'tfooter-row-class',
                        style: {},
                    },
                    td: {
                    //    className: 'tfooter-column-class',
                        style: {},
                    }
                }
            },
            actionButtons: [
                {
                    id: 'btn-print',
                //    className: 'text-white bg-green-500 hover:bg-green-700 text-sm px-4 py-3 leading-none border-transparent rounded-none',
                    text: 'Print'
                },
                {
                    id: 'btn-copy',
                //    className: 'text-white bg-green-500 hover:bg-green-700 text-sm px-4 py-3 leading-none border-transparent rounded-none',
                    text: 'Copy'
                },
                {
                    id: 'btn-pdf',
                //    className: 'text-white bg-green-500 hover:bg-green-700 text-sm px-4 py-3 leading-none border-transparent rounded-none',
                    text: 'Export To PDF'
                },
                {
                    id: 'btn-excel',
                //    className: 'text-white bg-green-500 hover:bg-green-700 text-sm px-4 py-3 leading-none border-transparent rounded-none',
                    text: 'Export To Excel'
                },
                {
                    id: 'btn-csv',
                //    className: 'text-white bg-green-500 hover:bg-green-700 text-sm px-4 py-3 leading-none border-transparent rounded-none',
                    text: 'Export To CSV'
                },
            ]
        }}
    />
}

export const SenderFileElement = () => {
    return <FileInput
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
                value: ["input 1", "input 2"],
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
}

export const SenderRadioElement = () => {
    return <Radio
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
                value: ["input 1", "input 2"],
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
}

export const SenderCheckElement = () => {
    return <Check
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
                required: true,
                checked: true
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
                value: ["input 1", "input 2"],
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
}

export const SenderInputElement = () => {
    return <Input
        data={[
            {
                name: "namasama",
                id: "idbeda", 
                label: {
                    left: {
                        text: "Input left label", 
                        className: "input-left-label", 
                        increments: {
                            type: "number",
                            prefix: true,
                            suffix: true
                        } 
                    },
                    right: {
                        text: "Input right label", 
                        className: "input-right-label", 
                        increments: {
                            type: "alphabetical",
                            prefix: true,
                            suffix: true
                        } 
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
                    left: {
                        text: "Input left label", 
                        className: "input-left-label", 
                        increments: {
                            type: "number",
                            prefix: true,
                            suffix: true
                        } 
                    },
                    right: {
                        text: "Input right label", 
                        className: "input-right-label", 
                        increments: {
                            type: "alphabetical",
                            prefix: true,
                            suffix: true
                        } 
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
                    left: {
                        text: "Input left label", 
                        className: "input-left-label", 
                        increments: {
                            type: "number",
                            prefix: true,
                            suffix: true
                        } 
                    },
                    right: {
                        text: "Input right label", 
                        className: "input-right-label", 
                        increments: {
                            type: "alphabetical",
                            prefix: true,
                            suffix: true
                        } 
                    }
                },
                className: "custom-input",
                placeholder: "Please input",
                value: ["input 1", "input 2"],
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
                left: {
                    text: "Input left added", 
                    className: "input-left-label", 
                    increments: {
                        type: "number",
                        prefix: true,
                        suffix: true
                    } 
                },
                right: {
                    text: "Input right added", 
                    className: "input-right-label", 
                    increments: {
                        type: "alphabetical",
                        prefix: true,
                        suffix: true
                    } 
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
}

export const SenderSelectElement = () => {
    return <Select
        data={[
            {
                name: "namasama",
                id: "idbeda", 
                options: [
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" }
                ],
                label: { 
                    left: {
                        text: "Select your option", 
                        className: "select-label", 
                        position:"left",
                        increments: {
                            type: "number",
                            prefix: true,
                            suffix: true
                        }
                    }
                },
                className: "custom-select",
                placeholder: "Please select",
                value: [],
                required: true
            }, {
                name: "namabeda",
                id: "idsama", 
                options: [
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" }
                ],
                label: { 
                    text: "Select your option", 
                    className: "select-label", 
                    position:"left",
                    increments: {
                        type: "alphabetical",
                        prefix: false,
                        suffix: true
                    } 
                },
                className: "custom-select",
                placeholder: "Please select",
                value: ["option2"],
                required: true
            }, {
                name: "namasama",
                id: "idsama", 
                options: [
                    { value: "option1", label: "Option 1" },
                    { value: "option2", label: "Option 2" }
                ],
                label: { 
                    text: "Select your option", 
                    className: "select-label", 
                    position:"right",
                    increments: {
                        type: "alphabetical",
                        prefix: true,
                        suffix: true
                    } 
                },
                className: "custom-select",
                placeholder: "Please select",
                value: ["option1"],
                required: true
            }
        ]}
        addable={{
            status: true,
            selectProps: {
                name: "namabeda",
                id: "idsama",
                options: [
                    { value: "option3", label: "Option 3" },
                    { value: "option4", label: "Option 4" }
                ],
                className: "custom-select",
                placeholder: "Please select"
            },
            label: {
                left: {
                    text: "Add new select",
                    className: "select-label",
                    position: "left",
                    increments: {
                        type: "number",
                        prefix: true,
                        suffix: false
                    }
                },
                right: {
                    text: "Add new select",
                    className: "select-label",
                    position: "left",
                    increments: {
                        type: "alphabetical",
                        prefix: true,
                        suffix: false
                    }
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
}

export const SenderTextAreaElement = () => {
    return <Input
        data={[
            {
                type: "textarea",
                name: "namasama",
                id: "idbeda", 
                label: {
                    left: {
                        text: "Input left label", 
                        className: "input-left-label", 
                        increments: {
                            type: "number",
                            prefix: true,
                            suffix: true
                        } 
                    },
                    right: {
                        text: "Input right label", 
                        className: "input-right-label", 
                        increments: {
                            type: "alphabetical",
                            prefix: true,
                            suffix: true
                        } 
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
                    left: {
                        text: "Input left label", 
                        className: "input-left-label", 
                        increments: {
                            type: "number",
                            prefix: true,
                            suffix: true
                        } 
                    },
                    right: {
                        text: "Input right label", 
                        className: "input-right-label", 
                        increments: {
                            type: "alphabetical",
                            prefix: true,
                            suffix: true
                        } 
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
                    left: {
                        text: "Input left label", 
                        className: "input-left-label", 
                        increments: {
                            type: "number",
                            prefix: true,
                            suffix: true
                        } 
                    },
                    right: {
                        text: "Input right label", 
                        className: "input-right-label", 
                        increments: {
                            type: "alphabetical",
                            prefix: true,
                            suffix: true
                        } 
                    }
                },
                className: "custom-input",
                placeholder: "Please input",
                value: ["input 1", "input 2"],
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
                left: {
                    text: "Input left added", 
                    className: "input-left-label", 
                    increments: {
                        type: "number",
                        prefix: true,
                        suffix: true
                    } 
                },
                right: {
                    text: "Input right added", 
                    className: "input-right-label", 
                    increments: {
                        type: "alphabetical",
                        prefix: true,
                        suffix: true
                    } 
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
}
