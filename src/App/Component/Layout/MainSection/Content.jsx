import React, { useState, useEffect } from 'react';

function Label(props) {
    return (
        <label className={props.class}>{props.text}</label>
    );
}

function Input(props) {
    return (
        <input name={props.name} className={props.className} {...props} />
    );
}

function Content(props) {
    const [value, setValue] = useState('');
    
    useEffect(() => {
        if ('' === value || isNaN(value)) {
            document.querySelector('.result-box').classList.add('hide');
        } else {
            document.querySelector('.result-box').classList.remove('hide'); 
        }
    }, [value]);
    
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    
    return (
        <section className="result-box" onChange={handleChange}>
            <Label class="result-label" text="Hasil Konversi" />
            <Input className="result-value" name="result-value" disabled={true} />
            <Input className="result-info" name="result-info" disabled={true} />
        </section>
    );
}

export default Content;