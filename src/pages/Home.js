import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

const Home = () => {
    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch("https://timely-mern.herokuapp.com/users/numberofusers");
            const json = await response.json();
            setNumberOfUsers(json);
        }

        fetchdata();
    }, []);

    const redirectToSignup = () => navigate("/auth/signup");

    return (
        <div className="home-container">
            <Navbar />
            <div className="hero">
                <div className="text">
                    <h3>Join us and do manage your time!</h3>
                    <p>Already {numberOfUsers} users!</p>
                    <button onClick={redirectToSignup}>Start Here</button>
                </div>
            </div>
            <div className="extra">
                <div className="quote normal">
                    <h5>
                        "There is one kind of robber whom the law does not strike at, and who steals what is most precious to men: time."
                    </h5>
                    <p>-Napoleon I</p>
                </div>
                <div className="quote reverse">
                    <h5>
                        "The trouble is, you think you have time."
                    </h5>
                    <p>-Jack Kornfield</p>
                </div>
            </div>
            <footer>
                Copyright &copy; 2014 Dagimawi Mantefardo
            </footer>
        </div>
    )
}

export default Home;