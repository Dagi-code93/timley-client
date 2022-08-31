import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskElement from "../components/Task";
import CountDownTimer from "../components/CountDownTimer";

// context hook
import useGoalsContext from "../hooks/useGoalsContext";
import useAuthContext from "../hooks/useAuthContext";

const Tasks = () => {
    const {dispach, goals} = useGoalsContext();
    const {user} = useAuthContext();

    const [newYearsGap, setNewYearsGap] = useState({
        dayGap: 0,
        hourGap: 0,
        minuteGap: 0,
        secondGap: 0
    });

    useEffect(() => {
        const fetchGoals = async () => {
          const response = await fetch("https://timely-mern.herokuapp.com/goals/", {
            headers: {
              "Authorization": `Bearer ${user?.token}`
            }
          });
          const data = await response.json();
          dispach({type: "FETCH_ALL", payload: data});
        }
        fetchGoals();
    }, [user.token, dispach]);

    useEffect(() => {
        const handle = setInterval(() => {
            convertDueDate(new Date("Sep 11, 2022"))
        }, 1000);
        return () => {
            clearInterval(handle);
        }
    }, []);

    const convertDueDate = (passedDate) => {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const now = new Date().getTime();
        const dueDate = new Date(passedDate);
        let gap;
        if((dueDate - now) < 0){
            gap = 0;
            return;
        }
        gap = dueDate - now;
        let dayGap = Math.floor(gap / day);
        let hourGap = Math.floor((gap % day) / hour);
        let minuteGap = Math.floor((gap % hour) / minute); 
        let secondGap = Math.floor((gap % minute) / second);
        setNewYearsGap({...gap, hourGap, dayGap, minuteGap, secondGap});
    }

    return (
        <div className="home-container">
            <Navbar />
            <div className="tasks-container">
                <h4 className="new-years-header">New Year CountDown</h4>
                <CountDownTimer 
                    dayGap={newYearsGap.dayGap}
                    hourGap={newYearsGap.hourGap}
                    minuteGap={newYearsGap.minuteGap}
                    secondGap={newYearsGap.secondGap}
                />
                <h2 className="goals-header">Goals</h2>
                {
                    goals?.length > 0 ? (
                        goals.map(goal => (
                            <TaskElement key={goal._id} goal={goal} />
                        ))
                    ) : (
                        <div className="user-message">
                            You have no saved goals. create on by clicking <Link to="/goals/add">here</Link>
                        </div>
                    )
                }                
            </div>
        </div>
    );
}

export default Tasks;