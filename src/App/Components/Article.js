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
        <article id="infoBox" className="hide animate__animated animate__bounceInUp"></article>
        </>
    );
}

function Copyright() {
    return (
        <div id="copy" className="copy">
            <a href="https://incodiy.com/" target="_blank" rel="noreferrer">incoDIY</a> © October 2024
        </div>
    );
}

function NotificationElement() {
    return (
        <>
        {/*<!-- Notification Section -->*/}
        <section id="notification"></section>
        </>
    );
}

export default Article;