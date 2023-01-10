
import AuthContext from "./authContext"
import { useState , useEffect} from "react";


const AuthContextProvider =(props)=>{

const [token,setToken]=useState(null);

const isUserLoggedIn=!!token;
useEffect(()=>{
    loginHandler();
},[]);


const loginHandler=(token)=>{
    if(!localStorage.token){
        setToken(token);
        localStorage.setItem("token",token);
    }else{
       
        setToken(localStorage.token);
    }
   

}

const logoutHandler=()=>{
    setToken(null);
    localStorage.clear();
}

    const contextValue={
        token:token,
        isLoggedIn:isUserLoggedIn,
        login:loginHandler,
        logout:logoutHandler,

    }
    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )



}

export default AuthContextProvider; 