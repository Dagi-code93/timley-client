import { useContext } from "react";

import { GoalsContext } from "../context/goalsContext";

const useGoalsContext = () => {
    const context = useContext(GoalsContext);
    if(!context){
        console.log("Goals context not available");
    }
    return context;
}

export default useGoalsContext;