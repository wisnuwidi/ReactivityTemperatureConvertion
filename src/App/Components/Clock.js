import React, { useEffect } from 'react';

function Clock() {

    const [date, setDate] = React.useState(new Date());
    
    const dateOptions = {
        weekday : 'long',
        year    : 'numeric',
        month   : 'long',
        day     : 'numeric',
    };

    const timeOptions = {
        hour            : 'numeric',
        minute          : 'numeric',
        second          : 'numeric',
        timeZoneName    : 'short',
    }
    
    let now     = date.toLocaleDateString('id', dateOptions);
    let clock   = date.toLocaleTimeString('id', timeOptions);

    useEffect(() => {
        const intervalID = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(intervalID);
    });

    return (
        <div id="clock" className="clock-container">
            { now } <span className="floatingX">[ { clock } ]</span>
        </div>
    );
}

export default Clock;