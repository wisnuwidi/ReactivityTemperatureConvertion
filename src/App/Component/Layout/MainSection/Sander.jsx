import { render } from '@testing-library/react';
import { Select } from '../../Element/FormElement/Select';

export default function Sander () {  
    return (
        <div className="sander">
            <Select
                data={[
                    {
                        name: "namasama",
                        id: "idbeda", 
                        options: [
                            { value: "option1", label: "Option 1" },
                            { value: "option2", label: "Option 2" }
                        ],
                        label: { text: "Select your option", className: "select-label" },
                        className: "custom-select",
                        placeholder: "Please select",
                        value: ["option1"],
                        required: true
                    }, {
                        name: "namabeda",
                        id: "idsama", 
                        options: [
                            { value: "option1", label: "Option 1" },
                            { value: "option2", label: "Option 2" }
                        ],
                        label: { text: "Select your option", className: "select-label" },
                        className: "custom-select",
                        placeholder: "Please select",
                        value: ["option1"],
                        required: true
                    }, {
                        name: "namasama",
                        id: "idsama", 
                        options: [
                            { value: "option1", label: "Option 1" },
                            { value: "option2", label: "Option 2" }
                        ],
                        label: { text: "Select your option", className: "select-label" },
                        className: "custom-select",
                        placeholder: "Please select",
                        value: ["option1"],
                        required: true
                    }
                ]}
                wrapper={[{
                    tag: "span",
                    className: "custom-wrapper",
                    style: {
                        display: "flex"
                    }
                }]}
                onChange={(event) => console.log(event.target.value)}
            />
        </div>
    );
}

/*
export const SenderSelectElement1 = () => {
    const maxDelete = 1;

    return <Select
        data={[
            {
                name: "select1",
                id: "select-id",
                options: [
                    { value: "option1", text: "Option 1" },
                    { value: "option2", text: "Option 2" },
                ],
                className: "selection-method s-25 line-box",
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
            },
            {
                name: "select2",
                id: "select-id",
                options: [
                    { value: "option1", text: "Option 1" },
                    { value: "option2", text: "Option 2" },
                ],
                className: "selection-method s-25 line-box",
                label: {
                    text: "Label Select 2",
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
        addable={{
            status: true,
            options: {
                add: {
                    text: "Add",
                    className: "add-button",
                    id: "add-button-id"
                },
                delete: {
                    text: "Delete",
                    className: "remove-button",
                    id: "remove-button-id"
                }
            },
            wrapper: {
                tag: "article",
                className: "multi-select-wrapper",
                id: "multi-select-wrapper-id",
                style: {
                    display: "flex"
                }
            },
            default: {
                name: "select-name-added",
                id: "select-id-added",
                className: "select-class-added selection-method s-25 line-box",
                options: [
                    { value: "option3", text: "Option 3" },
                    { value: "option4", text: "Option 4" },
                ]
            },
            label: {
                text: "Label Select Added",
                position: "left",
                increments: [
                    {
                        type: "alphabetical",
                        prefix: true,
                        suffix: true
                    }
                ]
            }
        }}
        wrapper={{
            tag: "span",
            className: "multi-select-wrapper",
            id: "multi-select-wrapper-id",
            style: {
                display: "flex"
            }
        }}
        maxDelete={1}
    />
}
    */