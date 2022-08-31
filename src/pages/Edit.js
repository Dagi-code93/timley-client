import  React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import spinIcon from "../images/spin-reverse.svg";
import buttonSpinIcon from "../images/spin.svg";
import useGoalsContext from "../hooks/useGoalsContext";
import useAuthContext from "../hooks/useAuthContext";

const Edit = () => {
    const {dispach} = useGoalsContext();
    const {user} = useAuthContext();
    const {id} = useParams();
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [goal, setGoal] = useState({
        title: "",
        description: "",
        dueDate: "2000-08-30",
        createdAt: "2000-08-30"
    });

    const [formIsLoading, setFormIsLoading] = useState(null);
    const [formError, setFormError] = useState(null);

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
    }, [user.token, id]);

    const handleChange = (e) => setGoal({...goal, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormIsLoading(true);
        const response = await fetch(`/goals/${goal._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.token}`
            },
            body: JSON.stringify({...goal})
        })
        const json = await response.json();

        if(!response.ok){
            setFormIsLoading(false);
            setFormError(json.err);
        }else{
            setFormIsLoading(false);
            setFormError(null);
            dispach({type: "EDIT", payload: json});
            navigate(`/goals/${goal._id}`);
        }
    }

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
                    <div className="add-goals-container">
                        <form onSubmit={handleSubmit} className="add-form">
                            <h2 className="goals-header">Edit Goal</h2>
                            <div>
                                <label>Title:</label>
                                <input 
                                    type="text"
                                    value={goal.title}
                                    name="title"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Description:</label>
                                <textarea
                                    name="description"
                                    value={goal.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div>
                                <label>Due date:</label>
                                <input 
                                    type="date"
                                    name="dueDate"
                                    value={goal.dueDate.split("T")[0]}
                                    onChange={handleChange}
                                />
                            </div>
                            {formError && <div className="user-message error">{formError}</div>}
                            <button disabled={formIsLoading}>
                                {formIsLoading ? (
                                    <>
                                        <img src={buttonSpinIcon} alt="loading" className="loadingiconimg"/>
                                        <span>Editing</span> 
                                    </>
                                ) :"Edit Goal"}
                            </button>
                        </form>
                    </div>
                ))
                )
            }
        </div>
    )
}

export default Edit;