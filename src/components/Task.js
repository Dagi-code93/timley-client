import React, {useState,useEffect} from 'react'
import {Link} from "react-router-dom";

const Task = ({goal}) => {
    const [gap, setGap] = useState({
        dayGap: 0,
        hourGap: 0,
        minuteGap: 0,
        secondGap: 0
    });

    useEffect(() => {
        const handle = setInterval(() => {
            convertDueDate(goal.dueDate)
        }, 1000);
        return () => {
            clearInterval(handle);
        }
    }, [goal.dueDate]);

    const convertDueDate = (passedDate) => {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const now = new Date().getTime();
        const dueDate = new Date(passedDate);
        let gap;
        if((dueDate - now) < 0){
            gap = 0
        }
        gap = dueDate - now;
        let dayGap = Math.floor(gap / day);
        let hourGap = Math.floor((gap % day) / hour);
        let minuteGap = Math.floor((gap % hour) / minute); 
        let secondGap = Math.floor((gap % minute) / second);
        setGap({...gap, hourGap, dayGap, minuteGap, secondGap});
    }

    

    return (
        <div className="task-container">
            <div className="text-details">
                <Link to={`/goals/${goal._id}`}><h3 className="task-title">{goal.title}</h3></Link>
                <p className="task-description">{goal.description.substring(0, 200)}<strong>...</strong></p>
            </div>
            <div className="timer">
                <div className="days">
                    <span className="time-digits">{gap.dayGap}</span>
                    <span className="time-indicators">D</span>
                </div>:
                <div className="hours">
                    <span className="time-digits">{gap.hourGap}</span>
                    <span className="time-indicators">H</span>
                </div>:
                <div className="minutes">
                    <span className="time-digits">{gap.minuteGap}</span>
                    <span className="time-indicators">M</span>    
                </div>:
                <div className="seconds">
                    <span className="time-digits">{gap.secondGap}</span>
                    <span className="time-indicators">S</span>
                </div>
            </div>
        </div>
    )
}

export default Task;
