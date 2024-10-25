import { render } from '@testing-library/react';
import { MultiSelect, Select } from '../../Element/FormElement/Select';

export default function Sander () {  
    return (
        <div className="sander">
            <SenderSelectElement />
        </div>
    );
}

export const SenderSelectElement = () => (
    <Select
        name="select"
        id="select-id"
        options={[
            { value: "option1", text: "Opsi 1" },
            { value: "option2", text: "Opsi 2" },
        ]}
        label= {{
            text: "Opsi Awal",
            position: "left",
            increments: [
                { type: "alphabetical", prefix: true, suffix: false },
            ]
        }}
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
                id: "select-add-id",
                options: [
                    { value: "option3", text: "Opsi 3" },
                    { value: "option4", text: "Opsi 4" },
                ],
                className: "selection-method s-25 line-box",
                label: {
                    text: "Tambahkan Opsi Baru",
                    position: "left",
                    increments: [
                        { type: "alphabetical", prefix: true, suffix: false },
                    ]
                }
            }
        }]}
    />
)

export const SenderSelectElementX = () => (
    <Select
        name="mySelect" //the first select element name
        value="option1" //the first select element value
        options={[
            { value: "option1", text: "Option 1" },
            { value: "option2", text: "Option 2" }
        ]} //the first select element options
        className="selection-method s-25 line-box" //the first select element class
        onChange={(event) => console.log(event.target.value)} //the first select element name
        wrapper={ [{//the first select element wrapper
            tag: "article", // the first select element wrapper tag. if this tag was not set, so the default tag is div and this tag was not property of wrapper, but the html tag for the wrapper
            className: "multi-select-wrapper", // the first select element wrapper class
            id: "multi-select-wrapper-id", // the first select element wrapper id
            style: { // wrapper can be customized and have some properties
                display: "flex",
            } }
        ]} 

        // addable, is optional, if not set, so there is no button for add the select element
        addable={[
            {
                status: true, // if status true, so there is a button for add the select element, if not, there is no button
                options: { // this is the options for the button
                    add: { text: "Add", className: "add-button", id: "add-button-id" }, // add button can be customized and have some properties
                    delete: { text: "Remove", className: "remove-button", id: "remove-button-id" } // delete button can be customized and have some properties
                },
                default: { // this is the default value for the select element that will be added
                    name: "selectadd", // the name of the select element that will be added and will outputing the bracket if there is more than one select element and the name of the select element in this addable was the same with the name of the first select element
                    className: "selection-method s-25 line-box", // the class of the select element that will be added
                    id: "select-id", // the id of the select element that will be added and will outputing the bracket if there is more than one select element and the id of the select element in this addable was the same with the id of the first select element
                    options: [ // the options of the select element that will be added
                        { value: "option3", text: "Option 3" },
                        { value: "option4", text: "Option 4" }
                    ]
                },
                label: { // this is the label for the select element that will be added
                    text: "Select Label", // the text of the label in the select element that will be added
                    position: "left", // the position of the label in the select element that will be added. the value can be "left" or "right"
                    increments: [ // the increments of the label in the select element that will be added
                        {
                            type: "alphabetical", // the type of the increment. the value can be "number" or "alphabetical"
                            prefix: true, // the prefix of the increment. the value can be true or false
                            suffix: true // the suffix of the increment. the value can be true or false
                        }
                    ],
                    className: "multi-select-label-class" // the class of the label in the select element that will be added
                }
            }
        ]}
    />
)

export const SenderMultiSelectElement = () => (
    <>
    <div style={{ display: "flex" }}>MultiSelect</div>
    <MultiSelect
        data={[
            { 
                name: "select",
                options: [
                    { value: "option1", text: "Option 1" },
                    { value: "option2", text: "Option 2" },
                ],
                className: "selection-method s-25 line-box",
                id: "select-id",
                label: {
                    text: "Select Label", 
                    position: "left",
                    className: "label-class"       
                }
            },
            { 
                name: "select",
                options: [
                    { value: "option1A", text: "Option 1A" },
                    { value: "option2A", text: "Option 2A" },
                    { value: "option3A", text: "Option 3A" },
                ],
                className: "selection-method s-25 line-box",
                id: "select-id",
                label: {
                    text: "Select Label", 
                    position: "left" 
                }
            },
            { 
                name: "select",
                options: [
                    { value: "option1A", text: "Option 1A" },
                    { value: "option2A", text: "Option 2A" },
                    { value: "option3A", text: "Option 3A" },
                ],
                className: "selection-method s-25 line-box",
                id: "select-id",
                label: {
                    text: "Select Label", 
                    position: "left" 
                }
            },
            { 
                name: "select-A",
                options: [
                    { value: "option1A", text: "Option 1A" },
                    { value: "option2A", text: "Option 2A" },
                    { value: "option3A", text: "Option 3A" },
                ],
                className: "selection-method s-25 line-box",
                id: "select-id-a",
                label: {
                    text: "Select Label", 
                    position: "left" 
                }
            },
            { 
                name: "select",
                options: [
                    { value: "option1B", text: "Option 1B" },
                    { value: "option2B", text: "Option 2B" },
                    { value: "option3B", text: "Option 3B" },
                ],
                className: "selection-method s-25 line-box",
                id: "select-id",
                label: {
                    text: "Select Label", 
                    position: "left" 
                }
            }
        ]}
        onChange={(event) => console.log(event.target.value)}
            
        wrapper={ [{
            tag: "article", 
            className: "multi-select-wrapper", 
            id: "multi-select-wrapper-id", 
            style: {
                display: "flex",
            } }
        ]}
        
        addable={[ 
            { 
                status: true, 
                options: { 
                    add: { text: "Add", className: "add-button", id: "add-button-id" }, 
                    delete: { text: "Remove", className: "remove-button", id: "remove-button-id" } 
                }, 
                wrapper: { 
                    tag: "span", 
                    className: "multi-select-wrapper", 
                    id: "multi-select-wrapper-id", 
                    style: {
                        display: "flex",
                    } 
                },
                default: {
                    name: "selectadd",
                    className: "selection-method s-25 line-box", 
                    options: [
                        { value: "option3", text: "Option 3" }, 
                        { value: "option4", text: "Option 4" }, 
                    ]
                },
                label: { 
                    text: "Select Label", 
                    position: "left",
                    increments: [
                        { 
                            type: "alphabetical", 
                            suffix: true
                        }
                    ],
                    className: "multi-select-label-class"
                }
            } 
        ]}
    />
    </>
)