import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import CountDownTimer from "../components/CountDownTimer";
import spinIcon from "../images/spin-reverse.svg";
import useGoalsContext from "../hooks/useGoalsContext";
import useAuthContext from "../hooks/useAuthContext";

const Task = () => {
    const {dispach} = useGoalsContext();
    const {user} = useAuthContext();
    const {id} = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [goal, setGoal] = useState({
        title: "",
        description: "",
        dueDate: "2000-08-30",
        createdAt: "2000-08-30"
    });
    const [gap, setGap] = useState({
        dayGap: 0,
        hourGap: 0,
        minuteGap: 0,
        secondGap: 0
    });

    useEffect(() => {
        setIsLoading(true);
        const fetchGoal = async () => {
            const response = await fetch(`/goals/${id}`, {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if(!response.ok){
                setIsLoading(false);
                setError(json.err);
            }else{
                setIsLoading(false);
                setError(null);
                setGoal(json);
            }
        }
        // fetch the goal data and update the state
        fetchGoal();
    }, [id, user.token]);

    useEffect(() => {
        const handle = setInterval(() => {
            convertDueDate(new Date(goal.dueDate))
        }, 1000);
        return () => {
            clearInterval(handle);
        }
    }, [goal.dueDate]);

    const returnAddedDate = (textDate) => {
        return new Date(textDate).toUTCString().substring(0, 16);
    }

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
        setGap({...gap, hourGap, dayGap, minuteGap, secondGap});
    }

    const redirectEdit = () => navigate(`/goals/${goal._id}/edit`);

    const handleDelete = async () => {
        const response = await fetch(`/goals/${goal._id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user?.token}`
            }
        });
        const json = await response.json();
        if(response.ok){
            dispach({type: "DELETE", payload: json});
            navigate("/goals");
        }else{
            console.log(json.err);
        }
    };

    return (
        <div className="home-container">
            <Navbar />
            {isLoading ? (
                <img src={spinIcon} alt="Spining icon" className="full-page-container" />
            ): (
                (error ? (
                    <div className="full-page-error">
                        <h2>{error}</h2>
                    </div>
                ) : (
                    <div className="single-task-container">
                        <div className="headers">
                            <h2>{goal.title}</h2>
                            <div className="task-actions-container">
                                <span onClick={redirectEdit}>
                                    <svg className="svg-icon" viewBox="0 0 20 20">
                                        <path fill="none" d="M19.404,6.65l-5.998-5.996c-0.292-0.292-0.765-0.292-1.056,0l-2.22,2.22l-8.311,8.313l-0.003,0.001v0.003l-0.161,0.161c-0.114,0.112-0.187,0.258-0.21,0.417l-1.059,7.051c-0.035,0.233,0.044,0.47,0.21,0.639c0.143,0.14,0.333,0.219,0.528,0.219c0.038,0,0.073-0.003,0.111-0.009l7.054-1.055c0.158-0.025,0.306-0.098,0.417-0.211l8.478-8.476l2.22-2.22C19.695,7.414,19.695,6.941,19.404,6.65z M8.341,16.656l-0.989-0.99l7.258-7.258l0.989,0.99L8.341,16.656z M2.332,15.919l0.411-2.748l4.143,4.143l-2.748,0.41L2.332,15.919z M13.554,7.351L6.296,14.61l-0.849-0.848l7.259-7.258l0.423,0.424L13.554,7.351zM10.658,4.457l0.992,0.99l-7.259,7.258L3.4,11.715L10.658,4.457z M16.656,8.342l-1.517-1.517V6.823h-0.003l-0.951-0.951l-2.471-2.471l1.164-1.164l4.942,4.94L16.656,8.342z"></path>
                                    </svg>
                                </span>
                                <span onClick={handleDelete}>
                                    <svg className="svg-icon" viewBox="0 0 20 20">
                                        <path fill="none" d="M18.693,3.338h-1.35l0.323-1.834c0.046-0.262-0.027-0.536-0.198-0.739c-0.173-0.206-0.428-0.325-0.695-0.325
                                        H3.434c-0.262,0-0.513,0.114-0.685,0.312c-0.173,0.197-0.25,0.46-0.215,0.721L2.79,3.338H1.307c-0.502,0-0.908,0.406-0.908,0.908
                                        c0,0.502,0.406,0.908,0.908,0.908h1.683l1.721,13.613c0.057,0.454,0.444,0.795,0.901,0.795h8.722c0.458,0,0.845-0.34,0.902-0.795
                                        l1.72-13.613h1.737c0.502,0,0.908-0.406,0.908-0.908C19.601,3.744,19.195,3.338,18.693,3.338z M15.69,2.255L15.5,3.334H4.623
                                        L4.476,2.255H15.69z M13.535,17.745H6.413L4.826,5.193H15.12L13.535,17.745z"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <p className="added-on">added on :- {returnAddedDate(goal.createdAt.split("T")[0])}</p>
                        <CountDownTimer 
                            dayGap={gap.dayGap}
                            hourGap={gap.hourGap}
                            minuteGap={gap.minuteGap}
                            secondGap={gap.secondGap}
                        />
                        <div className="description-container">
                            {goal.description}
                        </div>
                    </div>
                ))
            )}
            
        </div>
    );
}

export default Task;