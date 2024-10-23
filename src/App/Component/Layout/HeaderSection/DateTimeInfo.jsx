import { Clock, DateTime } from'../../Helper/ConstantMotion';

function DateTimeInfo() {

    return (
        <>
        <div className="clock-container">
            <DateTime />
            &nbsp;
            <span className="floatingX">
                [
                    &nbsp;
                    <Clock hour />:
                    <Clock minute />:
                    <Clock second />
                    &nbsp;
                ]
            </span>
        </div>
        </>
    );
}

export default DateTimeInfo;