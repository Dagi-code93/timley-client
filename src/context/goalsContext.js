import React, { useReducer, createContext } from "react";

export const GoalsContext = createContext();

const goalsReducer = (state, action) => {
    switch(action.type){
        case "FETCH_ALL":
            return {
                goals: action.payload
            };
        case "CREATE":
            return {
                goals: [action.payload, ...state.goals]
            };
        case "EDIT":
            return {
                goals: state.goals.map(goal => {
                    if(goal._id === action.payload._id){
                        return action.payload;
                    }
                    return goal;
                })
            }
        case "DELETE":
            return {
                goals: state.goals.filter(goal => goal._id !== action.payload._id)
            };
        case "CLEAR":
            return {
                goals: null
            }
        default: 
            return state;
    }
}

export const GoalsContextProvider = ({children}) => {
    const [state, dispach] = useReducer(goalsReducer, {
        goals: null
    });

    return (
        <GoalsContext.Provider value={{...state, dispach}}>
            {children}
        </GoalsContext.Provider>
    )
}