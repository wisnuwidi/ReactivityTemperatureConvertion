import { Select } from '../../Element/FormElement/Select';
import { Input } from '../../Element/FormElement/Input';
import { Check } from '../../Element/FormElement/Check';
import { Radio } from '../../Element/FormElement/Radio';
import { FileInput } from '../../Element/FormElement/FileInput';
import { Table } from '../../Element/TableElement/Table';

export default function Sander () {  
    return (
        <div className="sander" style={{ overflow: 'auto' }}>
            <SenderTable />
        </div>
    );
}


export const SenderTable = () => {
    return <Table
        head={{
            "name": "Nama",
            "first_name": "Panggilan",
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
                "age": item.age,
                "phone": item.phone,
                "address": item.address,
                "salary": item.salary,
                "bonus": item.bonus,
                "promoted_date": item.promoted_date,
                "position": item.position,
                "category": item.category,
                "status": item.active_status ? 'Aktif' : 'Tidak Aktif',
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
            style: {
                padding: '10px',
                border: '1px solid #ccc'
            }
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
            increment: true,
            incrementText: 'Row #',
            paginate: {
                firstPage: true,
                previous: true,
                next: true,
                lastPage: true,
                maxItems: 5,
                displayedButtons: 5,
            },
            properties: {
                thead: {
                    props: {
                        className: 'thead-class',
                        style: { backgroundColor: '#f0f0f0' },
                    },
                    tr: {
                        className: 'thead-row-class',
                        style: {},
                    },
                    td: {
                        className: 'thead-column-class',
                        style: {},
                    }
                },
                tbody: {
                    props: {
                        className: 'tbody-props-class',
                        style: {},
                    },
                    tr: {
                        className: 'tbody-row-class',
                        style: {},
                    },
                    td: {
                        className: 'tbody-column-class',
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
                        className: 'tfooter-column-class',
                        style: {},
                    }
                }
            }
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

export const SenderInputElement = () => {
    return <Input
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
                    text: "Select your option", 
                    className: "select-label", 
                    position:"left",
                    increments: {
                        type: "number",
                        prefix: true,
                        suffix: true
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
