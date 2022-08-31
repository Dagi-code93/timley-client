import React, {createContext, useReducer} from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {
                user: null
            }
        case "CHANGE_PROFILE_PIC":
            return {
                user: {...state.user, profilePic: action.payload}
            }
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispach] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem("user")) || null
    });

    return (
        <AuthContext.Provider value={{...state, dispach}}>
            {children}
        </AuthContext.Provider>
    )
}
