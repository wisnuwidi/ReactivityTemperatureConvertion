import { InputElement as Input, SelectElement as Select, TableElement as Table } from '../../Element/Elements';
import { MultiSelect } from '../../Element/FormElement/Select';
function Head () {
    return (
        <>
        <section>
            <MultiSelect
                name="mySelect"
                className="selection-method s-25 line-box"
                data={[
                    { value: "option1", className: "selection-method s-25 line-box", label: "Option 1" },
                    { value: "option2", className: "selection-method s-25 line-box", label: "Option 2" },
                ]}
                options={[
                    { value: "option1", text: "Option 1" },
                    { value: "option2", text: "Option 2" },
                ]}
                onChange={(event) => console.log(event.target.value)}
                addable={true}
                deleteText="Remove"
                addText="Add More"
                wrapperProps={{ 
                    className: "multi-select-wrapper",
                    style: {
                        display: "flex",
                    },
                }}
                buttonProps={{ className: "multi-select-button" }}
                addButtonProps={{ className: "add-button" }}
                deleteButtonProps={{ className: "delete-button" }}
                label={{ 
                    position: "right", 
                    text: "Choose an option", 
                    incrementalType: false, 
                    incrementalPrefix: false, 
                    incrementalSuffix: false 
                }}
            />
            <Select
                name="mySelect"
                className="selection-method s-25 line-box"
                value="option2"
                options={[
                    { value: "option1", text: "Option 1" },
                    { value: "option2", text: "Option 2" },
                    { value: "option3", text: "Option 3" },
                ]}
                onChange={(event) => console.log(event.target.value)}
                addable={true}
                deleteText="Remove"
                addText="Add More"
                wrapperProps={{ 
                    className: "wrapper",
                    style: {
                        display: "flex",
                    },
                }}
                addButtonProps={{ className: "add-button" }}
                deleteButtonProps={{ className: "delete-button" }}
                buttonProps={{ className: "my-select-button" }}
                labelProps={{ className: "my-select-label" }}
                labelText="My select label"
                labelPosition="left"
                incrementalType="alphabetical"
                incrementalPrefix={true}
            />
            <br /><hr /><br />
            <Table
                head={{
                    name: 'Name',
                    age: 'Age',
                    address: 'Address'
                }}
                data={[
                    { name: 'John Doe', age: 25, address: '123 Main St' },
                    { name: 'Jane Doe', age: 30, address: '456 Elm St' },
                    { name: 'Bob Doe', age: 35, address: '789 Oak St' },
                ]}
                onRowClick={(event, row) => console.log('row clicked', row)}
                onCellClick={(event, row, cell) => console.log('cell clicked', row, cell)}
                cellProps={{
                    style: {
                        padding: '10px',
                        border: '1px solid #ccc'
                    }
                }}
                customCell={(row, cell) => <a href="#">{cell}</a>}
            />
            <Input
                className="value-method input s-75" 
                name="value-method"
                data={[
                    { name: "user-name", value: "", className: "input" },
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
                minDeleteButton={1}
                addText="Tambah"
                deleteText="Hapus"
            />
        </section>
        </>
    );
}

export default Head;