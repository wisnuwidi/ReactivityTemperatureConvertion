import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { setStyle, getElm, ManipulateElements, NotificationInfo, CalculateTemperature } from "./Helpers/Helpers";

function ReturnCalculationTemperatureData(value, elements) {
    const inputConvertionIDValue = CalculateTemperature('#calcMethod', value);
    const calcMethodValue = getElm('#calcMethod').value;
    
    if (Object.keys(elements).length > 0) {
        Object.keys(elements).forEach((key) => {
            if ('#inputConvertionID' === elements[key] && !isNaN(inputConvertionIDValue)) {
                getElm(elements[key]).value = inputConvertionIDValue;
            }
            
            if ('#inputConvertionInfo' === elements[key] && !isNaN(inputConvertionIDValue)) {
                const replaceMethodName = 'celcius' === calcMethodValue ? 'fahrenheit' : 'celcius';
                getElm(elements[key]).value = `\u00B0${replaceMethodName}`;
            }

            if ('#infoBox' === elements[key] && !isNaN(inputConvertionIDValue)) {
                setStyle('show animate__animated animate__bounceInUp', getElm(elements[key]));
                InfoBoxCalculated(calcMethodValue, getElm('#inputCalcID').value, getElm('#inputConvertionID').value);
            }
        });
    }
}

function InfoBoxCalculated(method, input, result) {
    const isCelcius = method === 'celcius';
    const title     = isCelcius ? 'Konversi Celcius Ke Fahrenheit' : 'Konversi Fahrenheit Ke Celcius';
    const code      = isCelcius ? `(${input} \u00B0C × 9/5) + 32 = ${result} \u00B0F` : `(${input} \u00B0F − 32) × 5/9 = ${result} \u00B0C`;
    const subcode   = isCelcius ? 'S(\u00B0F) = (S(\u00B0C) x 9/5) + 32' : 'S(\u00B0C) = (S(\u00B0F) − 32) x 5/9';
    const resubcode = isCelcius ? 'S(\u00B0F) = (S(\u00B0C) x 1,8) + 32' : 'S(\u00B0C) = (S(\u00B0F) x 0,8) − 32';
    const content   = isCelcius ? 
        'Suhu S dalam derajat Fahrenheit (\u00B0F) sama dengan suhu S dalam derajat Celcius (\u00B0C) kali 9/5 tambah 32.' : 
        'Suhu S dalam derajat Celcius (\u00B0C) sama dengan suhu S dalam derajat Fahrenheit (\u00B0F) kali 5/9 kurang 32.';

    const infoBox = (
        <>
            <h3 id="infoTitle" className="info">Info Kalkulasi: <u>{title}</u></h3>
            <p id="infoCalc" className="info">Rumus Kalkulasi: <code>{code}</code></p>
            <details id="infoNotes" className="info">
                <summary>
                    <strong>Keterangan:</strong>
                </summary>
                {content}
                <p>
                    <code>{subcode}</code>
                    atau 
                    <code>{resubcode}</code>
                </p>
            </details>
        </>
    );

    ReactDOM.createRoot(getElm('#infoBox')).render(infoBox);
}

function EventHandleMethod() {
    const [value, setValue] = useState();
    
    useEffect(() => {
        const selfElement   = getElm('#calcMethod');
        const targetCalcElm = getElm('#inputCalcID');
        const targetConvElm = getElm('#convBox');
        EventHandleReverseConvertion();

        if (null !== selfElement) {

            setStyle('input s-75', targetCalcElm);
            targetCalcElm.disabled = true;
            if (selfElement.value) {
                targetCalcElm.disabled = false;
                targetCalcElm.focus();
                
                setStyle('show animate__animated animate__bounceInUp', targetConvElm);
                
                ReturnCalculationTemperatureData(targetCalcElm.value, {
                    'inputValue'  : targetCalcElm.value,
                    'nodeMethod'  : '#calcMethod',
                    'nodeConvert' : '#inputConvertionID',
                    'nodeInfo'    : '#inputConvertionInfo',
                    'infoBox'     : '#infoBox'
                });
            } else {
                ManipulateElements(['inputCalcID', 'inputConvertionID', 'inputConvertionInfo'], 'clear');
                ManipulateElements(['convBox', 'actionBox', 'notification', 'infoBox'], 'hide');
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
    
    useEffect(() => {
        const selfElement   = getElm('#inputCalcID');
        const resetButton   = getElm('#buttonReset');
        const reverseButton = getElm('#buttonReverse');
        
        if (null !== selfElement) {
            const notificationInfo = NotificationInfo({
                class : 'danger',
                text  : 'Ups, Data Harus Diisi Dan Wajib Berupa Angka Atau Desimal!'
            });

            if (isNaN(+selfElement.value) || selfElement.value === '') {
                resetButton.disabled   = true;
                reverseButton.disabled = true;
                
                if (isNaN(+selfElement.value)) {
                    ManipulateElements(['inputCalcID', 'inputConvertionID', 'inputConvertionInfo'], 'clear');
                    ManipulateElements('infoBox', 'hide');
                    
                    setStyle('input s-75 danger-info animate__animated animate__shakeX', selfElement);
                    setStyle('animate__animated animate__flash', getElm('#notification'));
                    if (!getElm('#notification').firstChild) ManipulateElements('notification', 'addChild', 'id', notificationInfo);
                }
            } else {
                selfElement.className   = 'input s-75';
                resetButton.disabled    = false;
                reverseButton.disabled  = false;
                
                setStyle('show animate__animated animate__bounceInUp', getElm('#actionBox'));
                ManipulateElements('notification', 'hide');
                ManipulateElements('notification', 'removeChild');
                
                ReturnCalculationTemperatureData(value, {
                    'inputValue'  : value,
                    'nodeMethod'  : '#calcMethod',
                    'nodeConvert' : '#inputConvertionID',
                    'nodeInfo'    : '#inputConvertionInfo',
                    'infoBox'     : '#infoBox'
                });
            }
        }
        
    }, [value]);
    
    return (event) => {
        const { value } = event.target;
        setValue(value);
    };
}

function EventHandleResetConvertion() {
    const resetButton = getElm('#buttonReset');
    
    if (null !== resetButton) {
        resetButton.addEventListener('click', () => {
            ManipulateElements(['calcMethod', 'inputCalcID', 'inputConvertionID', 'inputConvertionInfo'], 'clear');
            ManipulateElements(['convBox', 'actionBox', 'notification', 'infoBox'], 'hide');
        });
    }
}

function EventHandleReverseConvertion() {
    const reverseButton = getElm('#buttonReverse');

    if (reverseButton) {
        reverseButton.addEventListener('click', () => {
            const calcMethod = getElm('#calcMethod');
            const [calcValue, convValue] = [getElm('#inputCalcID'), getElm('#inputConvertionID')].map(el => el.value);
            
            getElm('#inputConvertionInfo').value = calcMethod.value;
            calcMethod.value = calcMethod.value === 'celcius' ? 'fahrenheit' : 'celcius';
            [getElm('#inputCalcID').value, getElm('#inputConvertionID').value] = [convValue, calcValue];
            
            InfoBoxCalculated(getElm('#calcMethod').value, getElm('#inputCalcID').value, getElm('#inputConvertionID').value);
        });
    }
}

function Calculation() {
    EventHandleResetConvertion();
    
    return (
        <section>
            <select id="calcMethod" className="calc-method s-25 line-box" onChange={EventHandleMethod()}>
                <option value="">Pilih Konversi</option>
                <option value="celcius">(&deg; C) Celcius</option>
                <option value="fahrenheit">(&deg; F) Fahrenheit</option>
            </select>
            <input id="inputCalcID" className="input s-75" disabled onInput={EventHandleInputCalculation()}/>
        </section>
    );
}


export default Calculation;