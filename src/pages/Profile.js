import React, {useState} from "react";

import Navbar from "../components/Navbar";
import useAuthContext from "../hooks/useAuthContext";

const Profile = () => {
    const {user, dispach} = useAuthContext();
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const handleFileUpload = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        const response = await fetch("https://timely-mern.herokuapp.com/users/profilePic", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization":  `Bearer ${user.token}`
            },
            body: JSON.stringify({profilePic: base64})
        });
        const json = await response.json();
        if(!response.ok){
            setIsLoading(false);
            setError(json.err);
        }else{
            setIsLoading(false);
            setError(null);
            dispach({type: "CHANGE_PROFILE_PIC", payload: json.user.profilePic});
        }
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="profile-container">
                <h2 className="header">Profile</h2>
                <div className="profileDetails">
                    <div className="img-container">
                        <img src={user?.profilePic} alt="Profie" />
                        <form>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                {isLoading ? "Changing..." : "Change Profile picture"}
                            </label>
                            <input 
                                type="file"
                                name="myFile"
                                accept=".jpeg, .png, .jpg"
                                onChange={(e) => handleFileUpload(e)}
                                id="file-upload"
                                disabled={isLoading}
                            />
                            {error && <div className="user-message error">{error}</div>}
                        </form>
                    </div>
                    <div className="details">
                        <h3>{user?.userEmail.split("@")[0]}</h3>
                        <p>Joined {new Date(user?.createdAt).toDateString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;