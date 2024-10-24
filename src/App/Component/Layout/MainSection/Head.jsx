import { InputElement as Input, SelectElement as Select, TableElement as Table } from '../../Element/Elements';
import { MultiSelect } from '../../Element/FormElement/Select';
function Head () {
    return (
        <>
        <section>
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
                            text: "Select Label", 
                            position: "left",
                            increments: { 
                                type: "number", 
                                prefix: "Prefix", 
                                suffix: "Suffix" 
                            }                
                        }
                    },
                    { 
                        name: "select2",
                        options: [
                            { value: "option1A", text: "Option 1A" },
                            { value: "option2A", text: "Option 2A" },
                            { value: "option3A", text: "Option 3A" },
                        ],
                        className: "selection-method s-25 line-box",
                        id: "select-id",
                        label: {
                            text: "Select Label", 
                            position: "left",
                            increments: { 
                                type: "number", 
                                prefix: "Prefix", 
                                suffix: "Suffix" 
                            }                
                        }
                    }
                ]}
                onChange={(event) => console.log(event.target.value)}
                addable={[ 
                    { 
                        status: true, 
                        options: { 
                            add: { text: "Add", className: "add-button", id: "add-button-id" }, 
                            delete: { text: "Remove", className: "remove-button", id: "remove-button-id" } 
                        }, 
                        wrapper: { 
                            tag: "div", 
                            className: "multi-select-wrapper", 
                            id: "multi-select-wrapper-id", 
                            style: {
                                display: "flex",
                            } 
                        },
                        default: { 
                            name: "select added", 
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
                                    type: "number", 
                                    prefix: "Prefix", 
                                    suffix: "Suffix" 
                                }
                            ]
                        }
                    } 
                ]}
            />
        </section>
        </>
    );
}

export default Head;