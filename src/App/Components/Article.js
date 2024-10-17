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
    const year      = new Date().getFullYear();
    const monthName = new Date().toLocaleDateString('id', { month: 'long' });

    return (
        <div id="copy">
            <a href="https://incodiy.com/" target="_blank" rel="noreferrer">incoDIY</a> © {monthName} {year}
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