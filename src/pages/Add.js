import  React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import spinIcon from "../images/spin.svg";
import useGoalsContext from "../hooks/useGoalsContext";
import useAuthContext from "../hooks/useAuthContext";

const Add = () => {
    const {dispach} = useGoalsContext();
    const {user} = useAuthContext();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: ""
    });
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);
    const navigate= useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch("https://timely-mern.herokuapp.com/goals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user?.token}`
            },
            body: JSON.stringify({...formData, userId: user._id})
        })
        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(json.err);
        }else{
            setFormData({
                title: "",
                description: "",
                dueDate: ""
            });
            setIsLoading(false);
            setError(null);
            dispach({type: "CREATE", payload: json});
            navigate(`/goals/${json._id}`);
        }
    }

    return (
        <div className="home-container">
            <Navbar />
            <div className="add-goals-container">
                <form onSubmit={handleSubmit} className="add-form">
                    <h2 className="goals-header">Add Goal</h2>
                    <div>
                        <label>Title:</label>
                        <input 
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <label>Due date:</label>
                        <input 
                            type="date" 
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <div className="user-message error">{error}</div>}
                    <button disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <img src={spinIcon} alt="loading" className="loadingiconimg"/>
                                <span>Adding</span> 
                            </>
                        ) :"Add Goal"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Add;