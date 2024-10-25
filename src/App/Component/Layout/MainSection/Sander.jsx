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
        name="mySelect"
        value="option1"
        options={[
            { value: "option1", text: "Option 1" },
            { value: "option2", text: "Option 2" }
        ]}
        className="selection-method s-25 line-box"
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
                default: {
                    name: "selectadd",
                    className: "selection-method s-25 line-box",
                    options: [
                        { value: "option3", text: "Option 3" },
                        { value: "option4", text: "Option 4" }
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