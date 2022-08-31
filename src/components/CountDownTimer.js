import React from "react";

const CountDownTimer = ({dayGap, hourGap, minuteGap, secondGap}) => {
    return (
        <div className="countdown-timer">
            <div className="box">
                <span className="time">
                    {dayGap}
                </span>
                <span className="time-ind">
                    days
                </span>
            </div>
            <div className="box">
                <span className="time">
                    {hourGap}
                </span>
                <span className="time-ind">
                    hours
                </span>
            </div>
            <div className="box">
                <span className="time">
                    {minuteGap}
                </span>
                <span className="time-ind">
                    minutes
                </span>
            </div>
            <div className="box">
                <span className="time">
                    {secondGap}
                </span>
                <span className="time-ind">
                    seconds
                </span>
            </div>
        </div>
    );
}

export default CountDownTimer;