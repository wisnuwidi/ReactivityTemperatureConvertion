import { act } from "react";
import { getElm } from "./Helpers/Helpers";

function Article() {
    return (
        <footer>
            {Info()}
            {Copyright()}
            {NotificationElement()}
        </footer>
    );
}

function Info() {
    return (
        <>
        {/*<!-- Article Information -->*/}
        <article id="info-box" className="hide animate__animated animate__bounceInUp">
            <h3 id="info-title" className="info">Info Kalkulasi: <u>Konversi Celcius Ke Fahrenheit</u></h3>
            <p id="info-calc" className="info">Rumus Kalkulasi: <code>(1 °C × 9/5) + 32 = 33 °F</code></p>
            <details id="info-notes" className="info">
                <summary>
                    <strong>Keterangan:</strong>
                </summary>
                Suhu S dalam derajat Fahrenheit (°F) sama dengan suhu S dalam derajat Celcius (°C) kali 9/5 tambah 32.
                <p>
                    <code>S(°F) = (S(°C) x 9/5) + 32</code>
                    atau 
                    <code>S(°F) = (S(°C) x 1,8) + 32</code>
                </p>
            </details>
        </article>
        </>
    );
}

function Copyright() {
    return (
        <div id="copy" className="copy">
            <a href="https://incodiy.com/" target="_blank">incoDIY</a> © October 2024
        </div>
    );
}

export const NotificationInfo = (text) => {
    return <div className="danger"><span className="close-btn">×</span>{text}</div>;
};

function NotificationElement() {
    /*

    if (action == 'show') {
        notifContent = (
            <div className="danger">
                <span className="close-btn" onClick={() => Notification('hide')}>×</span>
                Ups, Data Harus Diisi Dan Wajib Berupa Angka Atau Desimal!
            </div>
        );
    }
    */
    let action = 'hide';
    let notifContent;
    
    return (
        <>
        {/*<!-- Notification Section -->*/}
        <section id="notification" className={action}>{notifContent}</section>
        </>
    );
}

export default Article;