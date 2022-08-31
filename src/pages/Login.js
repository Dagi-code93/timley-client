import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import Navbar from "../components/Navbar";
import spinIcon from "../images/spin.svg";
import useAuthContext from "../hooks/useAuthContext";

const Login = () => {
    const {dispach} = useAuthContext();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await fetch("https://timely-mern.herokuapp.com/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: formData.email, password: formData.password})
        });
        const json = await response.json();
        if(!response.ok){
            setIsLoading(false);
            setError(json.err);
        }else{
            setIsLoading(false);
            setError(null);
            setFormData({
                email: "",
                password: ""
            });
            localStorage.setItem("user", JSON.stringify(json));
            dispach({type: "LOGIN", payload: json});
            navigate("/");
        }
    }

    return (
        <div className="home-container">
            <Navbar />
            <div className="form-container">
                <form onSubmit={handleSubmit} className="auth-form">
                    <h2>Login</h2>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input 
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <div className="user-message error">{error}</div>}
                    <button disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <img src={spinIcon} alt="loading" className="loadingiconimg"/>
                                <span>Logging in</span> 
                            </>
                        ) :"Login"}
                    </button>
                    <p>Don't have an account yet? <Link to="/auth/signup">Signup</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login;