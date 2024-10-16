import React, { useState, useEffect } from "react";
import { setStyle, getElm, ManipulateElements } from "./Helpers/Helpers";
import { NotificationInfo } from "./Article";

function EventHandleMethod() {
    const [value, setValue] = useState();
    
    const selfElement   = getElm('#calcMethod');
    const targetCalcElm = getElm('#inputCalcID');
    const targetConvElm = getElm('#convBox');
    
    useEffect(() => {
        if (null !== selfElement) {
            setStyle('input s-75', targetCalcElm);
            targetCalcElm.disabled = true;
            if (selfElement.value) {
                targetCalcElm.disabled = false;
                targetCalcElm.focus();
                
                setStyle('show animate__animated animate__bounceInUp', targetConvElm);
            } else {
                targetCalcElm.value = '';
                ManipulateElements(['convBox', 'actionBox', 'notification'], 'hide');
            }
        }
    }, [value]);

    return (event) => {
        const { value } = event.target;
        setValue(value);
    };
}

function EventHandleInputCalculation() {
    const [value, setValue] = useState();
    
    const selfElement   = getElm('#inputCalcID');
    const targetElement = getElm('#actionBox');
    const resetButton   = getElm('#buttonReset');
    const reverseButton = getElm('#buttonReverse');
    const notification  = getElm('#notification');
    
    useEffect(() => {
        if (null !== selfElement) {
                
            const notificationInfo = NotificationInfo('Ups, Data Harus Diisi Dan Wajib Berupa Angka Atau Desimal!');

            if (isNaN(+selfElement.value) || '' === selfElement.value) {
                selfElement.value      = '';
                resetButton.disabled   = true;
                reverseButton.disabled = true;
                
                setStyle('input s-75 danger-info animate__animated animate__shakeX', selfElement);
                setStyle('animate__animated animate__flash', notification);
                ManipulateElements('notification', 'addChild', 'id', notificationInfo);
            } else {
                selfElement.className   = 'input s-75';
                resetButton.disabled    = false;
                reverseButton.disabled  = false;

                setStyle('show animate__animated animate__bounceInUp', targetElement);
                ManipulateElements('notification', 'hide');
                ManipulateElements('notification', 'removeChild');
            }
        }
        
    }, [value]);
    
    return (event) => {
        const { value } = event.target;
        setValue(value);
    };
}

function Calculation() {
    
    const handleMethodChange    = EventHandleMethod();
    const handleInputCalcChange = EventHandleInputCalculation();

    return (
        <section>
            <select id="calcMethod" className="calc-method s-25 line-box" onClick={handleMethodChange}>
                <option value="">Pilih Konversi</option>
                <option value="celcius">(° C) Celcius</option>
                <option value="fahrenheit">(° F) Fahrenheit</option>
            </select>
            <input id="inputCalcID" className="input s-75" disabled onChange={handleInputCalcChange}/>
        </section>
    );
}

export default Calculation;