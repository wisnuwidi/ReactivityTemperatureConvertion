import React, { useState, useEffect } from 'react';

function NotificationChildren() {
    return (
        <div className="danger">
            <span className="close-btn" onClick={e => e.target.parentElement.style.display='none'}>&times;</span>
            Ups, Data Harus Diisi Dan Wajib Berupa Angka Atau Desimal!
        </div>
    );
}

function ReactNotification(props = '') {
    let classInfo  = 'notification-box';
    let notifChild =  '';
    
    if (props.react !== '') {
        if ('show' === props.react || 'active' === props.react) {
            classInfo  = props.react ? 'notification-box animate__animated animate__flash' : 'notification-box';
            notifChild = <NotificationChildren />;
        } else {
            classInfo  = props.react ? 'notification-box animate__animated animate__fadeOut' : 'notification-box';
        }
    }
    
    return <div className={classInfo}>{notifChild}</div>;
}

function Notification(props) {
    const [reaction, setReaction] = useState('');

    useEffect(() => {
        if ('' !== props.react) {
            setReaction(props.react);
            
            if (props.react === 'show' || props.react === 'active') {
                const interval = setInterval(() => setReaction('hide'), 5000);
                return () => clearInterval(interval);
            }
        }
    }, [props.react]);
    
    return (
        <ReactNotification react={reaction} /> 
    )

}

export default Notification;