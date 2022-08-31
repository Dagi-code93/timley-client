import {useContext} from "react";

import { AuthContext } from "../context/authContext";

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        console.log("Auth context unavailable");
    }

    return context;
} 

export default useAuthContext;